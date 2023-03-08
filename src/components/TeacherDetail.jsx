import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import Messages from "./Messages";
import Loader from "./Loader";

const TeacherDetail = () => {
    let {teacher_id} = useParams();
    const [teacher, setTeacher] = useState();
    const [teacherCourses, setTeacherCourses] = useState([]);

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTeacher = async () => {
        setLoading(true);
        const data = await axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/teachers/${teacher_id}`)
            .then((response) => {
                setTeacher(response.data);
                setTeacherCourses(response.data.teacher_courses);
            })
            .catch(
                error => (
                    setError(error.message)
                )
            );
        setLoading(false);
    };

    useEffect(() => {
        document.title = "Teacher Detail Page"
        getTeacher();
    }, [])

    console.log(teacher, teacherCourses)
    if (error) {
        return <Messages variant="danger" message={error}/>
    }
    if (isLoading) {
        return <Loader/>
    }

    if (teacher) {
        return (
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-4">
                        <img src="/logo512.png" className="img-thumbnail" alt=""/>
                    </div>

                    <div className="col-md-8">
                        <h1>{teacher.full_name }</h1>
                        <p>{teacher.detail}</p>
                        <p className='fw-bold'>Skills:
                            {
                                teacher.skills.split(',').map((skill, index) => (
                                    <Link key={index} to={`/category/${skill}`} className='ms-1'>{ skill }</Link>
                                ))
                            }
                        </p>
                        <p className='fw-bold'>Recent Courses: <Link to="/course/1">Reject Course</Link></p>
                        <p className='fw-bold'>Rating: 4.5/5</p>
                    </div>

                    <div className="col-md-12">
                        {/* course video */}
                        <div className='card mt-3 mb-5'>
                            <div className='card-header'>
                                <h5>Instructor Course List</h5>
                            </div>

                            <ul className='list-group list-group-flush'>
                                {
                                    teacherCourses && teacherCourses.map((course) => (
                                        <Link key={course.id} to={`/courses/${course.id}`} className='list-group-item'>{course.title}</Link>
                                    ))
                                }
                            </ul>
                        </div>
                        {/* end course video */}

                    </div>


                </div>
            </div>
        );
    }
};

export default TeacherDetail;
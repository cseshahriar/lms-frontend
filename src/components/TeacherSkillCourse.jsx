import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import Messages from "./Messages";
import Loader from "./Loader";

const TeacherSkillCourse = () => {
    let { category_slug } = useParams();
    let { teacher_id } = useParams();
    const [courses, setCourses] = useState([]);

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCourses = async () => {
        setLoading(true);
        await axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/courses/?category=${category_slug}&teacher_id=${teacher_id}`)
            .then((response) => {
                setCourses(response.data);
            })
            .catch(
                error => (
                    setError(error.message)
                )
            );
        setLoading(false);
    };

    useEffect(() => {
        document.title = `Course by ${category_slug} Category`
        getCourses();
    }, [])

    if (error) {
        return <Messages variant="danger" message={error}/>
    }
    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className='container mt-3'>
            {/* latest courses */}
            <h5 className="pd-1 mb-4" style={{ textTransform: 'capitalize' }}>{category_slug} <Link to='/all-courses' className='float-end'>See All</Link></h5>

            <div className="row mb-4">
                {
                    courses && courses.map((course, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="card p-3">
                                <Link to={`/courses/${course.id}`}>
                                    <img src={course.featured_img} className="card-img-top" alt={course.title} />
                                </Link>

                                <div className="card-body">
                                    <h5 className="card-title text-center">
                                        <Link to={`/courses/${course.id}`}>{course.title}</Link>
                                    </h5>
                                </div>

                                <div className='card-footer'>
                                    <div className='title'>
                                        <span>Rating: 4.5/5 </span>
                                        <span className='float-end'> Views: 1000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

                { courses.length < 1 ?  <Messages variant="danger" message="Data not found" /> : null}
            </div>


            {/* pagination */}
            <nav aria-label="Page navigation mt-3">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><Link className="page-link" href="#">Previous</Link></li>
                    <li className="page-item active"><Link className="page-link" href="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                    <li className="page-item"><Link className="page-link" href="#">Next</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default TeacherSkillCourse;
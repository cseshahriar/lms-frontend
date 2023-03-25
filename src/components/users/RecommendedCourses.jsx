import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from "axios";
import Moment from 'react-moment';

const RecommendedCourses = () => {
    const navigate = useNavigate();
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    const student_id = localStorage.getItem('student_id');
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        document.title="Recommended Courses";
        // login check
        if(studentLoginStatus !== 'true') {
            navigate('/user-login')
        }

        // get enrolments
        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/enrollments?studentId=${student_id}`,
        )
            .then((response) => {
                setEnrollments(response.data)
            })
            .catch((errors) => {
                console.log(errors.response.data)
            })
    }, [])

    console.log(enrollments)

    return (
        <div className='container py-5'>
            <div className='row'>
                {/* aside */}
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>

                {/* content */}
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>My Courses</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Duration</th>
                                    <th>Technologies</th>
                                    <th>Enrolled Time</th>
                                </tr>
                                </thead>

                                <tbody>
                                { enrollments && enrollments.map((el, index) => (
                                    <tr key={el.id}>
                                        <td>{ index + 1}</td>
                                        <td>
                                            <Link to={`courses/${el.course.id}`}>{ el.course.title }</Link>
                                        </td>
                                        <td>{ el.course.duration }</td>
                                        <td>{ el.course.technologies }</td>
                                        <td>
                                            <Moment parse="YYYY-MM-DD HH:mm">
                                                { el.enrolled_time }
                                            </Moment>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RecommendedCourses;
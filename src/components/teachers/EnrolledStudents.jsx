import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {isTeacherAuthenticated} from "../../functions";
import axios from 'axios';

import Moment from 'react-moment';
import 'moment-timezone';

const EnrolledStudents = () => {
    const {course_id} = useParams();
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        document.title="Enrolled Student List"

        isTeacherAuthenticated();
            axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/enrollments/courses/${course_id}/`,
            )
                .then((response) => {
                    setEnrollments(response.data)
                })
                .catch((errors) => {
                    console.log(errors.response.data)
                })

    }, [])

    return (
        <div className='container py-5'>
            <div className='row'>
                {/* aside */}
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>

                {/* content */}
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Enrolled Student List</h5>
                        <div className='card-body'>
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile No</th>
                                        <th>Enroll Time</th>
                                        <th>Interested Categories </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        enrollments && enrollments.map((enrollment, index) => (
                                            <tr key={index}>
                                                <td>{ index + 1 }</td>
                                                <td>{ enrollment.student.full_name }</td>
                                                <td>{enrollment.student.email }</td>
                                                <td>{enrollment.student.mobile_no }</td>
                                                <td>
                                                    <Moment format="DD/MM/YYYY hh:mm:ss">
                                                        { enrollment.enrolled_time }
                                                    </Moment>
                                                </td>
                                                <td>
                                                    <div className="d-grid gap-2 d-md-block">
                                                        { enrollment.course.title }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EnrolledStudents;
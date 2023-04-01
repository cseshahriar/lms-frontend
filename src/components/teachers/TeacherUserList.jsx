import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {isTeacherAuthenticated} from "../../functions";
import axios from "axios";

const TeacherUserList = () => {
    const user_id = localStorage.getItem('user_id')
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        isTeacherAuthenticated();
        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/enrollments?teacher_id=${user_id}`,
        )
        .then((response) => {
            setEnrollments(response.data)
            console.log('response ', response.data);
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
                        <h5 className='card-header'>All Student List</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile No</th>
                                    <th>Interested Categories </th>
                                    <th>Assignment</th>
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
                                                <div className="d-grid gap-2 d-md-block">
                                                    { enrollment.student.interested_categories }
                                                </div>
                                            </td>
                                            <td>
                                                <Link to={`/student/${enrollment.student.id}/assignments`} className='btn btn-sm btn-warning'>Assignments</Link>
                                                <Link to={`/student/${enrollment.student.id}/add-assignment`} className='ms-2 btn btn-sm btn-success'>Add Assignment</Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherUserList;
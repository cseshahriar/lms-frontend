import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {isTeacherAuthenticated} from "../../functions";

import axios from 'axios';


const TeacherCourses = () => {
    const user_id = localStorage.getItem('user_id')

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        isTeacherAuthenticated();
        try {
            axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/teacher/${user_id}/courses/`,
            )
            .then((response) => {
                setCourses(response.data)
            })
        } catch (error) {
            console.log(error)
        }
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
                        <h5 className='card-header'>My Courses</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Name</th>
                                        <th>Created By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        courses && courses.map((course, index) => (
                                            <tr key={index}>
                                                <td>{ index }</td>
                                                <td>{ course.title }</td>
                                                <td>
                                                    <Link to={`/teachers/${1}`}>{ course.teacher.full_name }</Link>
                                                </td>
                                                <td>
                                                    <button className='btn btn-sm btn-danger'>Delete</button>
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

export default TeacherCourses;
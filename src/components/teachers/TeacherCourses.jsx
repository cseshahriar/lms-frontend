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
    }, [user_id])

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
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Course</th>
                                        <th>Name</th>
                                        <th>Created By</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        courses && courses.map((course, index) => (
                                            <tr key={index}>
                                                <td>{ index + 1 }</td>
                                                <td>
                                                    <img src={course.featured_img} alt={course.title} style={{width:'80px'}} className="rounded" />
                                                </td>
                                                <td><Link to={`/courses/${course.id}/chapters/`}>{ course.title }</Link></td>
                                                <td>
                                                    <Link to={`/teachers/${user_id}`}>{ course.teacher.full_name }</Link>
                                                </td>
                                                <td>
                                                    <div className="d-grid gap-2 d-md-block">
                                                        <Link className='btn btn-sm btn-primary' to={`/courses/${course.id}/edit/`}>Edit</Link>
                                                        <button className='btn btn-sm btn-danger ms-1'>Delete</button>
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

export default TeacherCourses;
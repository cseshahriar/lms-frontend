import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
    const navigate = useNavigate();
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    const student_id = localStorage.getItem('student_id');
    const [student, setStudent] = useState();

    useEffect(() => {
        document.title="User Dashboard";

        // total_enrolled_students
        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/students/${student_id}`,
        )
        .then((response) => {
            setStudent(response.data)
        })
        .catch((errors) => {
            console.log(errors.response.data)
        })

        // login check
        if(studentLoginStatus !== 'true') {
            navigate('/user-login')
        }
    }, [studentLoginStatus])

    return (
        <div className='container py-5'>
            <div className='row'>
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                
                <section className='col-md-9'>
                    <div className='row'>

                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-header bg-primary text-white">
                                    Enrolled Courses
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to='/'>{ student && student.total_enrolled_students }</Link>
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-header bg-success text-white">
                                    Favorite Courses
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to='/'>{ student && student.total_favorite_students }</Link>
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-header bg-info text-white">
                                    Assignments
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to='/' className='text-success' title='Completed'>
                                            { student && student.total_complete_assignments }
                                        </Link>

                                        <Link to='/' className='text-secondary ms-1' title='Pending'>
                                            { student && student.total_pending_assignments }
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UserDashboard;

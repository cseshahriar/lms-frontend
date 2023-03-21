import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import TeacherSidebar from './TeacherSidebar';
import axios from "axios";
import Messages from "../Messages";

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const user_id = localStorage.getItem('user_id')
    const [errors, setErrors] = useState(null);
    const [teacher, setTeacher] = useState({})

    const getTeacher = () => {
        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/teachers/${user_id}/`,
        )
        .then((response) => {
            setTeacher(response.data)
        }).catch((errors) => {
            setErrors(errors.response.data)
        })
    }

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus !== 'true') {
        navigate('/teacher-login')
    }

    useEffect(() => {
        document.title="Teacher Dashboard";
        getTeacher();
    }, [navigate, teacherLoginStatus])

    if(errors) {
        return  <Messages variant="danger" message={errors}/>
    }

    return (
        <div className='container py-5'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>
                
                <section className='col-md-9'>
                    <div className="row">

                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-header bg-info text-white">
                                    Total Courses
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{ teacher.total_courses }</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-header bg-primary text-white">
                                    Total Chapters
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{ teacher.total_chapters }</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-header bg-success text-white">
                                    Total Students
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{ teacher.total_students }</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherDashboard;

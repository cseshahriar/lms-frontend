import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TeacherSidebar from './TeacherSidebar';

const TeacherDashboard = () => {
    const navigate = useNavigate();

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus !== 'true') {
        navigate('/teacher-login')
    }

    useEffect(() => {
        document.title="Teacher Dashboard"
    }, [navigate, teacherLoginStatus])

    return (
        <div className='container py-5'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>
                
                <section className='col-md-9'>
                    Teacher Dashboard
                </section>

            </div>
        </div>
    );
};

export default TeacherDashboard;

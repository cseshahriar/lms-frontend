import React, {useEffect} from 'react';
import Sidebar from './Sidebar';
import {useNavigate} from "react-router-dom";

const UserDashboard = () => {
    const navigate = useNavigate();
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');

    useEffect(() => {
        document.title="User Dashboard";

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
                    Dashboard
                </section>

            </div>
        </div>
    );
};

export default UserDashboard;

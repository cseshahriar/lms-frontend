import React from 'react';
import { Link } from 'react-router-dom';


const TeacherSidebar = () => {
    return (
        <div className='card'>
            <h5 className='card-header'>Teacher Dashboard</h5>
            <div className='list-group list-group-flush'>
                <Link to='/teacher-dashboard' className='list-group-item list-group-item-action'>Dashboard</Link>
                <Link to='/teacher-courses' className='list-group-item list-group-item-action'>My Courses</Link>
                <Link to='/teacher-users-list' className='list-group-item list-group-item-action'>My Users</Link>
                <Link to='/teacher-profile-setting' className='list-group-item list-group-item-action'>Profile Settings</Link>
                <Link to='/teacher-change-password' className='list-group-item list-group-item-action'>Change Password</Link>
                <Link to='/teacher-logout' className='list-group-item list-group-item-action'>Logout</Link>
            </div>
        </div>
    );
};

export default TeacherSidebar;
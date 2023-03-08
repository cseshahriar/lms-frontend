import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";


const Sidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('studentLoginStatus')
        localStorage.removeItem('student_id')
        localStorage.removeItem('student_name')
        navigate('/user-login');
        toast.success('Logout Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <div className='card'>
            <h5 className='card-header'>Dashboard</h5>
            <div className='list-group list-group-flush'>
                <Link to='/user-dashboard' className='list-group-item list-group-item-action'>Dashboard</Link>
                <Link to='/my-courses' className='list-group-item list-group-item-action'>My Courses</Link>
                <Link to='/favorite-courses' className='list-group-item list-group-item-action'>favorite Courses</Link>
                <Link to='/recommended-courses' className='list-group-item list-group-item-action'>Recommended Courses</Link>
                <Link to='/profile-setting' className='list-group-item list-group-item-action'>Profile Settings</Link>
                <Link to='/change-password' className='list-group-item list-group-item-action'>Change Password</Link>
                <button type='button' className='list-group-item list-group-item-action' onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
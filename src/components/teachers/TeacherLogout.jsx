import React from 'react';
import { useNavigate } from "react-router-dom";
const TeacherLogout = () => {
    localStorage.removeItem('teacherLoginStatus')
    window.location.href = '/teacher-login'
    return (
        <div></div>
    );
};

export default TeacherLogout;
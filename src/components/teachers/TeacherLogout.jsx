import React, { useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const TeacherLogout = () => {
    const navigate = useNavigate();
    localStorage.removeItem('teacherLoginStatus')
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
    navigate('/teacher-login')

    return (
        <div></div>
    );
};

export default TeacherLogout;
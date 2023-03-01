import React from 'react';

const TeacherLogout = () => {
    localStorage.removeItem('teacherLoginStatus')
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
    window.location.href = '/teacher-login';
    return (
        <div></div>
    );
};

export default TeacherLogout;
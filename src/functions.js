export const isTeacherAuthenticated = () => {
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(!teacherLoginStatus == 'true') {
        window.location.href = '/teacher-login';
    }
}


export const isUserAuthenticated = () => {
    const userLoginStatus = localStorage.getItem('userLoginStatus')
    if(!userLoginStatus == 'true') {
        window.location.href = '/user-login';
    }
}


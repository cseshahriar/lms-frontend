export const isTeacherAuthenticated = () => {
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus == 'true') {
       window.location.href = '/teacher-dashboard'
    } else {
        window.location.href = '/teacher-login'
    }
}
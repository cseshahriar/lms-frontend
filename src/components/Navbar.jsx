import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Navbar = () => {
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    const user_name = localStorage.getItem('user_name')

    // student
    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    const student_name = localStorage.getItem('student_name')

    const userLogout = () => {
        localStorage.removeItem('studentLoginStatus')
        localStorage.removeItem('student_id')
        localStorage.removeItem('student_name')
        window.location.href = '/user-login';
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id='navbar'>
            <div className="container">

                <Link className="navbar-brand" to="/">Learning Management System</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/all-courses">Courses</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About Us</Link>
                        </li>

                        {/* teachers urls */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false" title='Teacher'><i className="bi bi-person-circle"></i> { user_name && user_name }</a>
                            <ul className="dropdown-menu">
                                {
                                    teacherLoginStatus && teacherLoginStatus == 'true' ?
                                        <>
                                            <li><Link className="dropdown-item" to="/teacher-dashboard"><i
                                                className="bi bi-gear"></i> Dashboard</Link></li>
                                            <li><Link className="dropdown-item" to="/teacher-logout"><i
                                                className="bi bi-box-arrow-right"></i> Logout</Link></li>
                                        </>
                                        :
                                        <>
                                            <li><Link className="dropdown-item" to="/teacher-login"><i
                                                className="bi bi-box-arrow-left"></i> Login</Link></li>
                                            <li><Link className="dropdown-item" to="/teacher-register"><i
                                                className="bi bi-database-fill-add"></i> Register</Link></li>
                                        </>
                                }
                            </ul>
                        </li>

                        {/* user urls */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" title='Student'>
                                <i className="bi bi-person-circle"></i>
                                { student_name && student_name }
                            </a>
                            <ul className="dropdown-menu">
                                {
                                    studentLoginStatus && studentLoginStatus === 'true' ?
                                        <>
                                            <li><Link className="dropdown-item" to="/user-dashboard"><i className="bi bi-gear"></i> Dashboard</Link></li>
                                            <li><button type='button' className="dropdown-item" onClick={userLogout}><i className="bi bi-box-arrow-right"></i> Logout</button></li>
                                        </>
                                        :
                                        <>
                                            <li><Link className="dropdown-item" to="/user-login"><i className="bi bi-box-arrow-left"></i> Login</Link></li>
                                            <li><Link className="dropdown-item" to="/user-register"><i className="bi bi-database-fill-add"></i> Register</Link></li>
                                            <li><hr className='dropdown-divider'/></li>
                                        </>
                                }
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
        <ToastContainer />
        </>
    );
};

export default Navbar;
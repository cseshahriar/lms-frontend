import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
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
                            <Link className="nav-link" to="/courses">Courses</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About Us</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false"><i className="bi bi-person-circle"></i> Teacher Name</a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/teacher-login"><i
                                    className="bi bi-box-arrow-left"></i> Login</Link></li>
                                <li><Link className="dropdown-item" to="/teacher-register"><i
                                    className="bi bi-database-fill-add"></i> Register</Link></li>
                                <li>
                                    <hr className='dropdown-divider'/>
                                </li>
                                <li><Link className="dropdown-item" to="/teacher-dashboard"><i
                                    className="bi bi-gear"></i> Dashboard</Link></li>
                                <li><Link className="dropdown-item" to="/teacher-logout"><i
                                    className="bi bi-box-arrow-right"></i> Logout</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-circle"></i> User Name</a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/user-login"><i class="bi bi-box-arrow-left"></i> Login</Link></li>
                                <li><Link className="dropdown-item" to="/user-register"><i class="bi bi-database-fill-add"></i> Register</Link></li>
                                <li><hr className='dropdown-divider'/></li>
                                <li><Link className="dropdown-item" to="/user-dashboard"><i class="bi bi-gear"></i> Dashboard</Link></li>
                                <li><Link className="dropdown-item" to="/user-logout"><i class="bi bi-box-arrow-right"></i> Logout</Link></li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
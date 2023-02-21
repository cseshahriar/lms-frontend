import React from 'react';
import { Routes, Route } from "react-router-dom";

// ============================ components ====================================

import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';

import CourseDetail from './CourseDetail';

// ============================ pages =========================================
import About from './About';


// ============================ user components ===============================
import UserDashboard from './users/UserDashboard';
import UserLogin from './users/UserLogin';
import UserRegister from './users/UserRegister';


const Main = () => {
    return (
        <div className='App'>
            <Navbar/>
            
            {/* routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses/:course_id" element={<CourseDetail />} />
                <Route path="/courses/:course_id" element={<CourseDetail />} />
                {/* user dashboard */}
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/user-register" element={<UserRegister />} />
            </Routes>

            <Footer/>
        </div>
    );
};

export default Main;
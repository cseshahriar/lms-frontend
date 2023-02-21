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

import MyCourses from './users/MyCourses';
import FavoriteCourses from './users/FavoriteCourses';
import RecommendedCourses from './users/RecommendedCourses';
import ProfileSetting from './users/ProfileSetting';
import ChangePassword from './users/ChangePassword';


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
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/favorite-courses" element={<FavoriteCourses />} />
                <Route path="/recommended-courses" element={<RecommendedCourses />} />
                <Route path="/profile-setting" element={<ProfileSetting />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/logout" element={<RecommendedCourses />} />
            </Routes>

            <Footer/>
        </div>
    );
};

export default Main;
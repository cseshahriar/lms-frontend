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
import ProfileSetting from './users/ProfileSetting';
import ChangePassword from './users/ChangePassword';

// ============================ teachers components ===============================
import TeacherDashboard from "./teachers/TeacherDashboard";
import TeacherLogin from "./teachers/TeacherLogin";
import TeacherRegister from "./teachers/TeacherRegister";
import TeacherCourses from "./teachers/TeacherCourses";
import TeacherFavoriteCourses from "./teachers/TeacherFavoriteCourses";
import TeacherRecommendedCourses from "./teachers/TeacherRecommendedCourses";
import TeacherProfileSetting from "./teachers/TeacherProfileSetting";
import TeacherChangePassword from "./teachers/TeacherChangePassword";

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
                {/* user dashboard paths */}
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/user-register" element={<UserRegister />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/favorite-courses" element={<FavoriteCourses />} />
                <Route path="/recommended-courses" element={<RecommendedCourses />} />
                <Route path="/profile-setting" element={<ProfileSetting />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/logout" element={<UserLogin />} />

                {/* teacher dashboard paths */}
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/teacher-login" element={<TeacherLogin />} />
                <Route path="/teacher-register" element={<TeacherRegister />} />
                <Route path="/teacher-courses" element={<TeacherCourses />} />
                <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />} />
                <Route path="/teacher-change-password" element={<TeacherChangePassword />} />
                <Route path="/logout" element={<TeacherLogin />} />
            </Routes>

            <Footer/>
        </div>
    );
};

export default Main;
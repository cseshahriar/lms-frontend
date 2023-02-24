import React, {useEffect} from 'react';
import { Routes, Route } from "react-router-dom";

// ============================ components ====================================
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import CourseDetail from './CourseDetail';
import Courses from './Courses';

// ============================ pages =========================================
import About from './About';
import TeacherDetail from './TeacherDetail';

// ============================ List Pages ====================================
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';

import CategoryCourses from './CategoryCourses';
import AllFavoriteCourses from './AllFavoriteCourses';


// ============================ user components ===============================
import UserDashboard from './users/UserDashboard';
import UserLogin from './users/UserLogin';
import UserRegister from './users/UserRegister';
import MyCourses from './users/MyCourses';
import ProfileSetting from './users/ProfileSetting';
import ChangePassword from './users/ChangePassword';
import FavoriteCourses from "./users/FavoriteCourses";
import RecommendedCourses from "./users/RecommendedCourses";

// ============================ teachers components ===============================
import TeacherDashboard from "./teachers/TeacherDashboard";
import TeacherLogin from "./teachers/TeacherLogin";
import TeacherRegister from "./teachers/TeacherRegister";
import TeacherCourses from "./teachers/TeacherCourses";
import TeacherProfileSetting from "./teachers/TeacherProfileSetting";
import TeacherChangePassword from "./teachers/TeacherChangePassword";
import AddCourse from "./teachers/AddCourse";
import TeacherUserList from "./teachers/TeacherUserList";


const Main = () => {

    return (
        <div className='App'>
            <Navbar/>
            
            {/* routes */}
            <Routes>
                {/* website paths */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/all-courses" element={<AllCourses />} />
                <Route path="/courses/:course_id" element={<CourseDetail />} />
                <Route path="/category/:category_slug" element={<CategoryCourses />} />

                <Route path="/teachers/:teacher_id" element={<TeacherDetail />} />
                <Route path="/all-popular-courses" element={<PopularCourses />} />
                <Route path="/all-favorite-courses" element={<AllFavoriteCourses />} />
                <Route path="/all-popular-teachers" element={<PopularTeachers />} />

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
                <Route path="/teacher-add-course" element={<AddCourse />} />
                <Route path="/teacher-users-list" element={<TeacherUserList />} />
                <Route path="/logout" element={<TeacherLogin />} />
            </Routes>

            <Footer/>
        </div>
    );
};

export default Main;
import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';

import axios from "axios";

import Loader from "./Loader";
import Messages from "./Messages";
import {toast} from "react-toastify";

const CourseDetail = () => {
    let {course_id} = useParams();
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    const student_id = localStorage.getItem('student_id');

    // state data
    const [course, setCourse] = useState();
    const [skills, setSkills] = useState();
    const [related_courses, setRelatedCourses] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [teacher, setTeacher] = useState();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const [enrollmentStatus, setEnrollmentStatus] = useState(false);

    const getCourse = async () => {
        setLoading(true)
        const data = await axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/courses/${course_id}`)
            .then((response) => {
                setCourse(response.data);
                setChapters(response.data.course_chapters);
                setTeacher(response.data.teacher);
                setRelatedCourses(response.data.related_courses);
                setSkills(response.data.skill_list);
                setLoading(false);
            })
            .catch((errors) => {
                setErrors(errors.response.data);
            });
    };

    const getEnrollmentStatus = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/enrollment_status/${course_id}/${student_id}/`)
            .then((response) => {
                setEnrollmentStatus(response.data.bool);
            })
            .catch((errors) => {
                setErrors(errors.response.data);
            });
    }

    useEffect(() => {
        document.title = "Course Detail Page"
        getCourse();
        getEnrollmentStatus();

    }, [])

    if (errors) {
        Object.entries(errors).map(([key, value]) => (
            <Messages variant="danger" message={`${key.toUpperCase()}: ${value}`} key={key} />
        ))
    }

    if (isLoading) {
        return <Loader/>
    }

    const enrollCourse = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('course', course_id)
        formData.append('student', student_id)

        axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/enrollments/`,
            formData
        )
            .then((response) => {
                toast.success('Course Registration Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch((errors) => {
                let msg = errors.response.data.non_field_errors;
                toast.warning(`${msg}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log('enrollment errors', errors.response.data);
            });
    }

    if (course) {
        return (
            <div className="container py-5">
                <>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={course.featured_img} className="img-thumbnail" alt=""/>
                        </div>

                        <div className="col-md-8">
                            <h1>{course.title}</h1>
                            <p>{course.description}</p>
                            <p className='fw-bold'>Course Created By: <Link
                                to={`/teachers/${teacher.id}`}>{teacher.full_name}</Link>
                            </p>

                            <p className='fw-bold'>Technologies:
                                {
                                    skills && skills.map((skill, index) => (
                                        <Link key={index} to={`/category/${skill}`} className='ms-2 badge text-bg-info'>{ skill }</Link>
                                    ))
                                }
                            </p>
                            <p className='fw-bold'>Course Duration: 30 Hours 30 Minutes</p>
                            <p className='fw-bold'>Total Enrolled: 456 Students</p>
                            <p className='fw-bold'>Rating: 4.5/5</p>
                            <p>
                                {
                                    studentLoginStatus == 'true'
                                        ? enrollmentStatus === true
                                            ?
                                            <span className='text-success'>You are already enrolled in this course <Link to='/my-courses'>Go your courses page</Link></span>
                                            :
                                                <Link to='/' onClick={enrollCourse} className="btn btn-success">Enroll in this course</Link>
                                        :
                                            <Link to='/user-login' onClick={enrollCourse}>Please login for the enrollment in this course</Link>
                                }
                            </p>
                        </div>
                    </div>

                    {/* course video */}
                    <div className='card mt-3 mb-5'>
                        <div className='card-header'>
                            <h5>Course Videos</h5>
                        </div>

                        <ul className='list-group list-group-flush'>
                            {
                                chapters && chapters.map((chapter) => (
                                    <li className='list-group-item' key={chapter.id}>{ chapter.title }

                                        <span className='float-end'>
                                            <span className='me-5'>1 Hour 30 Minutes</span>
                                            <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target={`#exampleModal${chapter.id}`} >
                                                <i className="bi bi-youtube"></i>
                                            </button>
                                        </span>

                                        <div className="modal fade" id={`exampleModal${chapter.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">{chapter.title}</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="ratio ratio-16x9">
                                                            <iframe
                                                                src={`${chapter.video}?rel=0`}
                                                                title={chapter.title} frameBorder="0" allowFullScreen></iframe>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </>

                <h1 className="pd-1 mb-4">Related Courses</h1>
                <div className="row mb-4">
                    {
                        related_courses && related_courses.map((related_course, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="card">
                                    <Link to={`/courses/${related_course.id}`} target="_blank">
                                        <img src={`${process.env.REACT_APP_API_BASE_URL}/${related_course.featured_img}`} className="card-img-top" alt={related_course.title} />
                                    </Link>

                                    <div className="card-body">
                                        <h5 className="card-title text-center">
                                            <Link target="_blank" to={`/courses/${related_course.id}`}>{related_course.title}</Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
};

export default CourseDetail;
import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';

import axios from "axios";

import Loader from "./Loader";
import Messages from "./Messages";
import {toast} from "react-toastify";


const CourseDetail = () => {
    let {course_id} = useParams();
    const student_id = localStorage.getItem('student_id');
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');

    // state data
    const [course, setCourse] = useState();
    const [skills, setSkills] = useState();
    const [related_courses, setRelatedCourses] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [teacher, setTeacher] = useState();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [enrollmentStatus, setEnrollmentStatus] = useState(false);
    const [ratingStatus, setRatingStatus] = useState(false);
    const [favoriteStatus, setFavoriteStatus] = useState(false);

    const [ratingData, setRatingData] = useState({
        'course': parseInt(course_id),
        'student': parseInt(student_id),
        'rating': '',
        'comment': ''
    });

    // rating for data
    const getCourse = async () => {
        setLoading(true)
        await axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/courses/${course_id}`)
            .then((response) => {
                // set data from course
                setCourse(response.data);
                setChapters(response.data.course_chapters);
                setTeacher(response.data.teacher);
                setRelatedCourses(response.data.related_courses);
                setSkills(response.data.skill_list);

                setRatingData({
                    'course': parseInt(course_id),
                    'student': parseInt(student_id),
                    'rating': '',
                    'comment': ''
                })

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

    const getCourseFavoriteStatus = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/favorite_status/${course_id}/${student_id}/`)
            .then((response) => {
                setFavoriteStatus(response.data.bool);
            })
            .catch((errors) => {
                setErrors(errors.response.data);
            });
    }

    const getRatingStatus = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/rating_status/${course_id}/${student_id}/`)
            .then((response) => {
                setRatingStatus(response.data.bool);
            })
            .catch((errors) => {
                setErrors(errors.response.data);
            });
    }

    useEffect(() => {
        document.title = "Course Detail Page"
        getCourse();
        getEnrollmentStatus();
        getRatingStatus();
        getCourseFavoriteStatus();
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

    const handleChange = (event) => {
        setRatingData({
            ...ratingData, [event.target.name]: event.target.value
        })
    }

    const submitCourseRating = (e) => {
        e.preventDefault();
        const ratingFormData = new FormData();
        ratingFormData.append('course', parseInt(ratingData.course))
        ratingFormData.append('student', parseInt(ratingData.student))
        ratingFormData.append('rating', ratingData.rating)
        ratingFormData.append('comment', ratingData.comment)

        console.log('type of', typeof ratingData.course)

        axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/course-rating/`,
            ratingFormData
        )
            .then((response) => {
                toast.success('Rating successfully submitted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setRatingData({
                    'course': '',
                    'student': '',
                    'rating': '',
                    'comment': ''
                })
            })
            .catch((errors) => {
                setErrors(errors.response.data);
            });
    }

    const modalCloseHandle = (e) => {
        setRatingData({
            'course': '',
            'student': '',
            'rating': '',
            'comment': ''
        })
    }

    // make as favourite
    const makeFavourite = (e) => {
        e.preventDefault();
        const favoriteFormData = new FormData();
        favoriteFormData.append('course', parseInt(course_id))
        favoriteFormData.append('student', parseInt(student_id))
        axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/favorites/`,
            favoriteFormData
        )
            .then((response) => {
                toast.success('Favorite successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                getCourseFavoriteStatus();
            })
            .catch((errors) => {
                setErrors(errors.response.data);
            });
    }

    const removeFavourite = (e) => {
        e.preventDefault();
        axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/remove_favorite_status/${parseInt(course_id)}/${parseInt(student_id)}/`,
        )
            .then((response) => {
                toast.success('Remove from favorite successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                getCourseFavoriteStatus();
            })
            .catch((errors) => {
                setErrors(errors.response.data);
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
                            <p className='fw-bold'>Course Duration: { course.duration }</p>
                            <p className='fw-bold'>Total Enrolled: { course.total_enrolled_students } { course.total_enrolled_students <= 1 ? 'Student' : 'Students'}</p>
                            <p className='fw-bold'>Rating: &nbsp;
                                <span className="badge rounded-pill text-bg-primary">
                                    {course.course_rating}/5
                                </span>
                            </p>


                            {/* favoriteStatus  */}
                            <p>
                                { favoriteStatus == true ? 'Remove Favorite' : 'Make Favorite' }
                                &nbsp;
                                {
                                    studentLoginStatus == 'true'
                                        ?
                                            favoriteStatus == true ? (
                                                <button onClick={removeFavourite} title="Remove favourite course." className='btn btn-sm btn-danger'>
                                                    <i className="bi bi-heart-fill"></i>
                                                </button>
                                            ) : (
                                                <button title="Add in your favourite course list." onClick={makeFavourite} className='btn btn-sm btn-outline-secondary'>
                                                    <i className="bi bi-heart-fill"></i>
                                                </button>
                                            ) :
                                        null
                                }
                            </p>

                            {/* rating modal start */}
                            {
                                studentLoginStatus == 'true' ?
                                     enrollmentStatus === true ?
                                         ratingStatus == true
                                             ?
                                             <span className='text-success'>You are already given rating for this course</span>
                                         :
                                             <button type="button" className="btn btn-success btn-sm mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                 Leave a review
                                             </button>
                                     :
                                         null
                                :
                                    null
                            }

                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel"> Rate for {course.title}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <div className="modal-body">
                                            <form>
                                                {
                                                    errors && Object.entries(errors).map(([key, value]) => (
                                                        <Messages variant="danger" message={`${key.toUpperCase()}: ${value}`} key={key} />
                                                    ))
                                                }
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputPassword1" className="form-label">Rating</label>
                                                    <select className='form-control' name='rating' onChange={handleChange}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputPassword1" className="form-label">Review</label>
                                                    <textarea name="comment" className="form-control" rows="5" onChange={handleChange} value={ratingData.comment}></textarea>
                                                </div>
                                                <div className="mb-3 d-flex justify-content-center">
                                                    <button onClick={modalCloseHandle} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button onClick={submitCourseRating} type="submit" className="btn btn-success ms-1">Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* rating modal end */}

                            <p>
                                {
                                    studentLoginStatus == 'true'
                                        ? enrollmentStatus === true
                                            ?
                                            <span className='text-success'>You are already enrolled in this course <Link to='/my-courses'>Go your courses page</Link></span>
                                            :
                                                <Link to='/' onClick={enrollCourse} className="btn btn-success">Enroll in this course</Link>
                                        :
                                            <Link to='/user-login' >Please login for the enrollment in this course</Link>
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
                                            <span className='me-5'>{ chapter.duration }</span>
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
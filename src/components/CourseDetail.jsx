import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';

import axios from "axios";

import Loader from "./Loader";
import Messages from "./Messages";

const CourseDetail = () => {
    let {course_id} = useParams();
    const [course, setCourse] = useState();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCourse = async () => {
        setLoading(true);
        const data = await axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/courses/${course_id}`)
            .then((response) => {
                setCourse(response.data);
            })
            .catch(error => setError(error));
        setLoading(false);
    };

    useEffect(() => {
        document.title = "Course Detail Page"
        getCourse();
    }, [])

    console.log('course', course)

    if (error) {
        return <Messages variant="danger" message={error}/>
    }
    if (isLoading) {
        return <Loader/>
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
                                to={`/teachers/${course.teacher.id}`}>{course.teacher.full_name}</Link></p>
                            <p className='fw-bold'>Course Duration: 30 Hours 30 Minutes</p>
                            <p className='fw-bold'>Total Enrolled: 456 Students</p>
                            <p className='fw-bold'>Rating: 4.5/5</p>
                        </div>
                    </div>

                    {/* course video */}
                    <div className='card mt-3 mb-5'>
                        <div className='card-header'>
                            <h5>Course Videos</h5>
                        </div>

                        <ul className='list-group list-group-flush'>
                            {
                                course.chapters && course.chapters.map((chapter) => (
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
                                                                src={`${process.env.REACT_APP_API_BASE_URL}/media/${chapter.video}?rel=0`}
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
                    {/* end course video */}
                </>

                <h1 className="pd-1 mb-4">Related Courses</h1>
                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="card">

                            <Link to={`/courses/${1}`}>
                                <img src="/logo512.png" className="card-img-top" alt=""/>
                            </Link>

                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    <Link to={`/courses/${1}`}>Course title</Link>
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">

                            <Link to={`/courses/${1}`}>
                                <img src="/logo512.png" className="card-img-top" alt=""/>
                            </Link>

                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    <Link to={`/courses/${1}`}>Course title</Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default CourseDetail;
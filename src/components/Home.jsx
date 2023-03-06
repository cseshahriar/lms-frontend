import React, {useEffect, useState} from 'react';
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import AllFavoriteCourses from './AllFavoriteCourses';
import PopularTeachers from './PopularTeachers';
import { Link } from "react-router-dom";
import axios from "axios";


const Home = () => {
    const [courseData, setCourseData ] = useState();

    useEffect(() => {
        document.title="LMS Home Page"
        try {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/courses/?limit=4`)
                .then((response) => {
                    setCourseData(response.data);
                    console.log(response.data);
                })
        } catch (error) {
            console.log(error)
        }

    }, [])

    return (
        <div className="container mt-4">

            {/* latest courses */}
            <h5 className="pd-1 mb-4">Latest Courses <Link to='/all-courses' className='float-end'>See All</Link></h5>
            <div className="row mb-4">
                {
                    courseData && courseData.map((course) => (
                        <div className="col-md-3 mb-4" key={course.id}>
                            <div className="card p-3">
                                <Link to={`/courses/${course.id}`}>
                                    <img src={course.featured_img} className="card-img-top" alt={course.title} />
                                </Link>

                                <div className="card-body">
                                    <h5 className="card-title text-center">
                                        <Link to={`/courses/${course.id}`}>{course.title}</Link>
                                    </h5>
                                </div>

                                <div className='card-footer'>
                                    <div className='title'>
                                        <span>Rating: 4.5/5 </span>
                                        <span className='float-end'> Views: 1000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* End latest courses */}


            {/* Popular courses */}
            <h5 className="pd-1 mb-4">Popular Courses <Link to='/all-popular-courses' className='float-end'>See All</Link></h5>
            <div className="row mb-4">
                {/* single course */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <Link to={`/courses/${1}`}>
                            <img src="python.png" className="card-img-top" alt="" />
                        </Link>

                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <Link to={`/courses/${1}`}>Course title</Link>
                            </h5>
                        </div>

                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5 </span>
                                <span className='float-end'> Views: 1000</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* single course */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <Link to={`/courses/${1}`}>
                            <img src="django.png" className="card-img-top" alt="" />
                        </Link>

                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <Link to={`/courses/${1}`}>Course title</Link>
                            </h5>
                        </div>

                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5 </span>
                                <span className='float-end'> Views: 1000</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* single course */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <Link to={`/courses/${1}`}>
                            <img src="python.png" className="card-img-top" alt="" />
                        </Link>

                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <Link to={`/courses/${1}`}>Course title</Link>
                            </h5>
                        </div>

                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5 </span>
                                <span className='float-end'> Views: 1000</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* single course */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <Link to={`/courses/${1}`}>
                            <img src="django.png" className="card-img-top" alt="" />
                        </Link>

                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <Link to={`/courses/${1}`}>Course title</Link>
                            </h5>
                        </div>

                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5 </span>
                                <span className='float-end'> Views: 1000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End latest courses */}

            {/* Popular Instructors */}
            <h5 className="pd-1 mb-4">Popular Instructors <Link to='/all-popular-teachers' className='float-end'>See All</Link></h5>
            <div className="row mb-4">
                {/* single course */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <Link to={`/teachers/${1}`}>
                            <img src="teacher.png" className="card-img-top" alt="" />
                        </Link>

                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <Link to={`/teachers/${1}`}>Name</Link>
                            </h5>
                        </div>

                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5 </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* single course */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <Link to={`/teachers/${1}`}>
                            <img src="teacher.png" className="card-img-top" alt="" />
                        </Link>

                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <Link to={`/teachers/${1}`}>Name</Link>
                            </h5>
                        </div>

                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5 </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* single course */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <Link to={`/teachers/${1}`}>
                            <img src="teacher.png" className="card-img-top" alt="" />
                        </Link>

                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <Link to={`/teachers/${1}`}>Name</Link>
                            </h5>
                        </div>

                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5 </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* single course */}
                <div className="col-md-3 mb-4">
                    <div className="card p-3">
                        <Link to={`/teachers/${1}`}>
                            <img src="teacher.png" className="card-img-top" alt="" />
                        </Link>

                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <Link to={`/teachers/${1}`}>Course title</Link>
                            </h5>
                        </div>

                        <div className='card-footer'>
                            <div className='title'>
                                <span>Rating: 4.5/5 </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Popular Instructors */}


            {/* student  testimonial */}
            <h5 className="pd-1 mb-4 mt-5">Student Testimonials</h5>
            <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                        </figure>
                    </div>

                    <div className="carousel-item">
                        <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                        </figure>
                    </div>

                    <div className="carousel-item">
                        <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                        </figure>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> 
            {/* End student testimonial */}

        </div>
    );
};

export default Home;
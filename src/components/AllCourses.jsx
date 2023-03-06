import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import Loader from "./Loader";
import Messages from "./Messages";

const AllCourses = () => {
    const [courseData, setCourseData ] = useState();

    useEffect(() => {
        document.title="All Course Page"
        try {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/courses/`)
                .then((response) => {
                    setCourseData(response.data);
                    console.log(response.data);
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className='container mt-4'>
            {/* latest courses */}
            <h5 className="pd-1 mb-4">Latest Courses</h5>
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

            {/* pagination */}
            <nav aria-label="Page navigation mt-3">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><Link className="page-link" href="#">Previous</Link></li>
                    <li className="page-item active"><Link className="page-link" href="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                    <li className="page-item"><Link className="page-link" href="#">Next</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default AllCourses;
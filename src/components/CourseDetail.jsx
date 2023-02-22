import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CourseDetail = () => {
    let { course_id } = useParams();
    console.log('course_id', course_id);
    
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-4">
                    <img src="/logo512.png" className="img-thumbnail" alt="" />
                </div>

                <div className="col-md-8">
                    <h1>Course Title</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, error doloremque ipsa optio, est enim cupiditate doloribus soluta reiciendis architecto perferendis. Inventore adipisci ullam autem! Quam aperiam numquam itaque optio.</p>
                    <p className='fw-bold'>Course Created By: <Link to="/teachers/1">Author Name</Link></p>
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
                    <li className='list-group-item'>Introduction 
                        <button className='btn btn-sm btn-danger float-end'>
                            <i class="bi bi-youtube"></i>
                        </button>
                    </li>
                    <li className='list-group-item'>Setup project
                        <button className='btn btn-sm btn-danger float-end'>
                            <i class="bi bi-youtube"></i>
                        </button>
                    </li>
                    <li className='list-group-item'>
                        Start with functional component
                        <button className='btn btn-sm btn-danger float-end'>
                                <i class="bi bi-youtube"></i>
                        </button>
                    </li>
                </ul>
            </div>
            {/* end course video */}


            <h1 className="pd-1 mb-4">Related Courses</h1>
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card">
                        
                        <Link to={`/courses/${1}`}>
                            <img src="/logo512.png" className="card-img-top" alt="" />
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
                            <img src="/logo512.png" className="card-img-top" alt="" />
                        </Link>

                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <Link to={`/courses/${1}`}>Course title</Link>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
            {/* End latest courses */}

        </div>
    );
};

export default CourseDetail;
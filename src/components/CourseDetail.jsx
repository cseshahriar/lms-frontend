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
                        <span className='float-end'>
                            <span className='me-5'>1 Hour 30 Minutes</span>
                            <button type="button"  className='btn btn-sm btn-danger float-end' 
                                data-bs-toggle="modal" data-bs-target="#videoModal1">
                                <i class="bi bi-youtube"></i>
                            </button>
                        </span>

                        {/* video modal start */}
                        <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="videoModal1Label" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="videoModal1Label">Video title 1</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div class="ratio ratio-16x9">
                                            <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* video modal end */}
                    </li>

                    <li className='list-group-item'>Setup Environment
                        <span className='float-end'>
                            <span className='me-5'>1 Hour 30 Minutes</span>
                            <button type="button"  className='btn btn-sm btn-danger float-end' 
                                data-bs-toggle="modal" data-bs-target="#videoModal2">
                                <i class="bi bi-youtube"></i>
                            </button>
                        </span>

                        {/* video modal start */}
                        <div className="modal fade" id="videoModal2" tabindex="-1" aria-labelledby="videoModal2Label" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="videoModalLabel">Modal title 2</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div class="ratio ratio-16x9">
                                            <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* video modal end */}
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
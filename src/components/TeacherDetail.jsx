import React from 'react';
import { useParams, Link } from 'react-router-dom';

const TeacherDetail = () => {
    let { teacher_id } = useParams();
    console.log('teacher_id', teacher_id);

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-4">
                    <img src="/logo512.png" className="img-thumbnail" alt="" />
                </div>

                <div className="col-md-8">
                    <h1>Teacher Name</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, error doloremque ipsa optio, est enim cupiditate doloribus soluta reiciendis architecto perferendis. Inventore adipisci ullam autem! Quam aperiam numquam itaque optio.</p>
                    <p className='fw-bold'>Skills: <Link to="/category/php">PHP</Link>, <Link to="/category/python">Python</Link>, <Link to="/category/javascript">JavaScript</Link></p>
                    <p className='fw-bold'>Recent Courses: <Link to="/course/1">Reject Course</Link></p>
                    <p className='fw-bold'>Rating: 4.5/5</p>
                </div>

                <div className="col-md-12">
                    {/* course video */}
                    <div className='card mt-3 mb-5'>
                        <div className='card-header'>
                            <h5>Course List</h5>
                        </div>
                        
                        <ul className='list-group list-group-flush'>
                            <Link to="/courses/1" className='list-group-item'>PHP Course</Link>
                            <Link to="/courses/2" className='list-group-item'>JavaScript Course</Link>
                            <Link to="/courses/3" className='list-group-item'>Python Course</Link>
                        </ul>
                    </div>
                    {/* end course video */}

                </div>


            </div>
        </div>
    );
};

export default TeacherDetail;
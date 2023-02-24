import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const PopularTeachers = () => {
    const [teachers, setTeachers] = useState(null);

    useEffect(() => {
        document.title="Popular Teacher";
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/teachers/`)
            .then((response) => {
                setTeachers(response.data);
            });
    }, []) // dependencies

    return (
        <div className='container mt-4'>
            {/* latest courses */}
            <h5 className="pd-1 mb-4">Popular Instructors </h5>

            <div className="row mb-4">
                {
                    teachers && teachers.map((teacher) => (
                        <div className="col-md-3 mb-4" key={teacher.id}>
                            <div className="card p-3">
                                <Link to={`/teachers/${1}`}>
                                    <img src="teacher.png" className="card-img-top" alt="" />
                                </Link>

                                <div className="card-body">
                                    <h5 className="card-title text-center">
                                        <Link to={`/teachers/${1}`}>{teacher.full_name}</Link>
                                    </h5>
                                </div>

                                <div className='card-footer'>
                                    <div className='title'>
                                        <span>Rating: 4.5/5 </span>
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

export default PopularTeachers;
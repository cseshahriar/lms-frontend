import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const RecommendedCourses = () => {
    useEffect(() => {
        document.title="Recommended Courses"
    })

    return (
        <div className='container py-5'>
            <div className='row'>
                {/* aside */}
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>

                {/* content */}
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Recommended Courses</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Name</th>
                                        <th>Created By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Python Development</td>
                                        <td>
                                            <Link to={`/teachers/${1}`}>Shahriar Hosen</Link>
                                        </td>
                                        <td>
                                            <button className='btn btn-sm btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RecommendedCourses;
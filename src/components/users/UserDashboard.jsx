import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div className='container py-5'>
            <div className='row'>

                <aside className='col-md-3'>
                    <div className='card'>
                        <h5 className='card-header'>Dashboard</h5>
                        <div className='list-group list-group-flush'>
                            <Link to='/' className='list-group-item list-group-item-action active'>My Courses</Link>
                            <Link to='/' className='list-group-item list-group-item-action'>favorite Courses</Link>
                            <Link to='/' className='list-group-item list-group-item-action'>Recommended Courses</Link>
                            <Link to='/' className='list-group-item list-group-item-action'>Profile Settings</Link>
                            <Link to='/' className='list-group-item list-group-item-action'>Change Password</Link>
                            <Link to='/user-logout' className='list-group-item list-group-item-action'>Logout</Link>
                        </div>
                    </div>
                </aside>

                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>My Courses</h5>
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

export default UserDashboard;

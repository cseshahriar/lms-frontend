import React, {useEffect} from 'react';
import TeacherSidebar from './TeacherSidebar';
import {isTeacherAuthenticated} from "../../functions";

const TeacherChangePassword = () => {
    useEffect(() => {
        isTeacherAuthenticated();
    })

    return (
        <div className='container py-5'>
            <div className='row'>
                {/* aside */}
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>

                {/* content */}
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Change Password</h5>
                        <div className='card-body'>
                            <form className="row g-3">

                                <div className="mb-3 row mt-4">
                                    <label for="inputPassword" className="col-sm-3 col-form-label">New Password</label>
                                    <div className="col-sm-9">
                                        <input type="password" className="form-control" id="inputPassword"/>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-3 col-form-label">Confirm Password</label>
                                    <div className="col-sm-9">
                                        <input type="password" className="form-control" id="inputPassword"/>
                                    </div>
                                </div>

                                <hr />
                                <button className="btn btn-success">Save</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherChangePassword;
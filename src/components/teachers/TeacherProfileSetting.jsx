import React from 'react';
import TeacherSidebar from './TeacherSidebar';

const TeacherProfileSetting = () => {
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
                        <h5 className='card-header'>Profile Setting</h5>
                        <div className='card-body'>
                            <form className="row g-3">
                                
                                <div className="mb-3 row mt-4">
                                    <label for="full_name" class="col-sm-2 col-form-label">Full Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="full_name" value="Shahriar"/>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-10">
                                        <input type="text" readonly class="form-control" id="staticEmail" value="email@example.com"/>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" id="inputPassword"/>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="photo" className="col-sm-2 col-form-label">Profile Photo</label>
                                    <div className="col-sm-10">
                                        <input type="file" name="photo" className="form-control" id="photo"/>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="interest" className="form-label">Skills</label>
                                    <textarea name="interest" className="form-control" id="interest"></textarea>
                                    <div id="emailHelp" className="form-text">PHP, Python, JavaScript</div>
                                </div>



                                <hr />
                                <button class="btn btn-success">Save</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeacherProfileSetting;
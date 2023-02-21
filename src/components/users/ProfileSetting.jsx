import React from 'react';
import Sidebar from './Sidebar';

const ProfileSetting = () => {
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

                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" id="inputPassword"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProfileSetting;
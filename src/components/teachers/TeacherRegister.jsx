import React from 'react';

const TeacherRegister = () => {
    return (
        <div className='container py-5'>
            <div className='row'>
                <div className='col-md-6 offset-3'>
                    <div className='card'>
                        <h3 className='card-header'>Teacher Register</h3>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3">
                                    <label for="full_name" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="full_name"/>
                                </div>

                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email"/>
                                    
                                </div>

                                <div className="mb-3">
                                    <label for="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" />
                                </div>
                                

                                <div class="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                </div>

                                <div class="mb-3">
                                    <label for="interest" className="form-label">Skills</label>
                                    <textarea name="interest"  className="form-control" id="interest"></textarea>
                                    <div id="emailHelp" class="form-text">PHP, Python, JavaScript</div>
                                </div>

                                <div class="mb-3 text-center">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default TeacherRegister;
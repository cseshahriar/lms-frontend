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
                                    <label htmlFor="username" className="form-label">Qualification</label>
                                    <input type="text" className="form-control" name='qualification'
                                           id="qualification"/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="mobile_no" className="form-label">Mobile Number</label>
                                    <input type="text" className="form-control" name='mobile_no' id="mobile_no"/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="skills" className="form-label">Skills</label>
                                    <textarea name="skills" className="form-control" id="skills"></textarea>
                                    <div id="skillsHelp" className="form-text">PHP, Python, JavaScript</div>
                                </div>

                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" className="form-control" name='email' id="email"/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name='Password' className="form-control" id="Password"/>
                                </div>

                                <div className="mb-3 text-center">
                                    <button type="submit" className="btn btn-success">Register</button>
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
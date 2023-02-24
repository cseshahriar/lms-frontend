import React, {useEffect} from 'react';

const UserRegister = () => {
    useEffect(() => {
        document.title="User Register"
    })

    return (
        <div className='container py-5'>
        <div className='row'>
            <div className='col-md-6 offset-3'>
                <div className='card'>
                    <h1 className='card-header'>Register</h1>
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
                            
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>

                            <div className="mb-3">
                                <label for="interest" className="form-label">Interest</label>
                                <textarea name="interest"  className="form-control" id="interest"></textarea>
                                <div id="emailHelp" className="form-text">PHP, Python, JavaScript</div>
                            </div>

                            <div className="mb-3 text-center">
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

export default UserRegister;
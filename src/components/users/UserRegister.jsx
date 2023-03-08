import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isUserAuthenticated } from "../../functions";
import Messages from "../Messages";
import { ToastContainer, toast } from 'react-toastify';


const UserRegister = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title="User Register"
        // if already logged in redirect to dashboard
        const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
        if(isUserAuthenticated == 'true') {
            window.location.href = '/user-dashboard'
        }
    }, [])

    // states
    const [errors, setErrors] = useState();

    const [studentData, setStudentData] = useState({
        'full_name': '',
        'qualification': '',
        'mobile_no': '',
        'email': '',
        'password': '',
        'address': '',
        'interested_categories': '',
    });

    // input change take values function
    const handleChange = (event) => {
        setStudentData({
            ...studentData, [event.target.name]: event.target.value
        })
    }

    // submit form function
    const submitForm = (e) => {
        e.preventDefault();
        setErrors(null);

        const formData = new FormData();
        formData.append('full_name', studentData.full_name)
        formData.append('qualification', studentData.qualification)
        formData.append('mobile_no', studentData.mobile_no)
        formData.append('interested_categories', studentData.interested_categories)
        formData.append('email', studentData.email)
        formData.append('password', studentData.password)
        formData.append('address', studentData.address)

        // post to backend
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/students/`, formData)
            .then((response) => {
                setStudentData({
                    'full_name': '',
                    'qualification': '',
                    'mobile_no': '',
                    'email': '',
                    'password': '',
                    'address': '',
                    'interested_categories': '',
                })
                navigate('/user-login');
                toast.success('Registration Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }).catch((errors) => {
                setErrors(errors.response.data);
            })
    }

    return (
        <div className='container py-5'>
        <div className='row'>
            <div className='col-md-6 offset-3'>
                <div className='card'>
                    <h1 className='card-header'>Student Registration</h1>
                    <div className='card-body'>
                        <form>

                            {
                                errors && Object.entries(errors).map(([key, value]) => (
                                    <Messages variant="danger" message={`${key.toUpperCase()}: ${value}`} key={key} />
                                ))
                            }

                            <div className="mb-3">
                                <label htmlFor="full_name" className="form-label">Full Name</label>
                                <input type="text" value={ studentData.full_name } className="form-control" name="full_name" id="full_name" onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="qualification" className="form-label">Qualification</label>
                                <input type="text" value={ studentData.qualification } className="form-control" name='qualification' id="qualification" onChange={handleChange}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mobile_no" className="form-label">Mobile Number</label>
                                <input type="text" value={ studentData.mobile_no } className="form-control" name='mobile_no' id="mobile_no" onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input value={ studentData.email } type="email" className="form-control" name='email' id="email" onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input value={ studentData.password } type="password" name='password' className="form-control" id="Password" onChange={handleChange}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea name="address"  className="form-control" id="address" value={ studentData.address } onChange={handleChange}></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="interested_categories" className="form-label">Interest</label>
                                <textarea name="interested_categories"  className="form-control" id="interested_categories" value={ studentData.interested_categories } onChange={handleChange}></textarea>
                                <div id="emailHelp" className="form-text">PHP, Python, JavaScript</div>
                            </div>

                            <div className="mb-3 text-center">
                                <button onClick={submitForm} type="submit" className="btn btn-primary">Submit</button>
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
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {isUserAuthenticated} from "../../functions";
import Messages from "../Messages";

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
    const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);

    const [studentData, setStudentData] = useState({
        'full_name': '',
        'qualification': '',
        'mobile_no': '',
        'skills': '',
        'email': '',
        'password': '',
        'status': ''
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
        const formData = new FormData();
        formData.append('full_name', studentData.full_name)
        formData.append('qualification', studentData.qualification)
        formData.append('mobile_no', studentData.mobile_no)
        formData.append('interested_categories', studentData.interested_categories)
        formData.append('email', studentData.email)
        formData.append('password', studentData.password)

        // post to backend
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/students/`, formData)
            .then((response) => {
                setStudentData({
                    'full_name': '',
                    'qualification': '',
                    'mobile_no': '',
                    'interested_categories': '',
                    'email': '',
                    'password': '',
                    'status': 'success'
                })
                setIsAlertVisible(true);

                setTimeout(function () {
                    setIsAlertVisible(false);
                    navigate('/user-login');
                }, 3000);

                console.log('res', response.data)
            }).catch((errors) => {

                // setErrors(errors.response.data);
                setStudentData({'status': 'error'});
                setErrors(errors.response.data);
            })
    }

    console.log('errors', errors)

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
                                <input type="text" className="form-control" id="full_name"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="interested_categories" className="form-label">Interest</label>
                                <textarea name="interested_categories"  className="form-control" id="interested_categories"></textarea>
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
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {isTeacherAuthenticated} from "../../functions";
import Messages from "../Messages";
import {toast} from "react-toastify";


const TeacherRegister = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title="Teacher Register"

        // if already logged in redirect to dashboard
        const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
        if(teacherLoginStatus == 'true') {
            window.location.href = '/teacher-dashboard'
        }
    }, [])



    // states
    const [errors, setErrors] = useState();

    const [teacherData, setTeacherData] = useState({
        'full_name': '',
        'qualification': '',
        'mobile_no': '',
        'skills': '',
        'email': '',
        'password': '',
    });

    // input change take values function
    const handleChange = (event) => {
        setTeacherData({
            ...teacherData, [event.target.name]: event.target.value
        })
    }

    // submit form function
    const submitForm = (e) => {
        e.preventDefault();
        setErrors(null);

        const teacherFormData = new FormData();
        teacherFormData.append('full_name', teacherData.full_name)
        teacherFormData.append('qualification', teacherData.qualification)
        teacherFormData.append('mobile_no', teacherData.mobile_no)
        teacherFormData.append('skills', teacherData.skills)
        teacherFormData.append('email', teacherData.email)
        teacherFormData.append('password', teacherData.password)

        // post to backend
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/teachers/`, teacherFormData)
            .then((response) => {
                setTeacherData({
                    'full_name': '',
                    'qualification': '',
                    'mobile_no': '',
                    'skills': '',
                    'email': '',
                    'password': '',
                })
                navigate('/teacher-login');
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
                    {
                        errors && Object.entries(errors).map(([key, value]) => (
                            <Messages variant="danger" message={`${key.toUpperCase()}: ${value}`} key={key} />
                        ))
                    }

                    <div className='card'>
                        <h3 className='card-header'>Teacher Register</h3>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="full_name" className="form-label">Full Name</label>
                                    <input type="text" value={ teacherData.full_name } className="form-control" name="full_name" id="full_name" onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="qualification" className="form-label">Qualification</label>
                                    <input type="text" value={ teacherData.qualification } className="form-control" name='qualification' id="qualification" onChange={handleChange}/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="mobile_no" className="form-label">Mobile Number</label>
                                    <input type="text" value={ teacherData.mobile_no } className="form-control" name='mobile_no' id="mobile_no" onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="skills" className="form-label">Skills</label>
                                    <textarea value={ teacherData.skills } name="skills" className="form-control" id="skills" onChange={handleChange} ></textarea>
                                    <div id="skillsHelp" className="form-text">PHP, Python, JavaScript</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input value={ teacherData.email } type="email" className="form-control" name='email' id="email" onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input value={ teacherData.password } type="password" name='password' className="form-control" id="Password" onChange={handleChange}/>
                                </div>

                                <div className="mb-3 text-center">
                                    <button onClick={submitForm} type="submit" className="btn btn-success">Register</button>
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
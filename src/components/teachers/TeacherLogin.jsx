import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {isTeacherAuthenticated} from "../../functions";


const TeacherLogin = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);

    const [teacherLoginData, setTeacherLoginData] = useState({
        'email': '',
        'password': '',
        'status': ''
    });

    const handleChange = (event) => {
        setTeacherLoginData({
            ...teacherLoginData, [event.target.name]: event.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        const teacherLoginFormData = new FormData();
        teacherLoginFormData.append('email', teacherLoginData.email)
        teacherLoginFormData.append('password', teacherLoginData.password)

        try {
            // post to backend
            axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/teachers/login/`,
                teacherLoginFormData,
            )
            .then((response) => {
                console.log('response', response)
                if(response.data.bool == true) {
                    localStorage.setItem('teacherLoginStatus', true)
                    isTeacherAuthenticated()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.title="Teacher Login"
        const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
        if(teacherLoginStatus == 'true') {
            navigate('/teacher-dashboard');
        }
    })

    return (
        <div className='container py-5'>
            <div className='row'>
                <div className='col-md-6 offset-3'>
                    <div className='card'>
                        <h3 className='card-header'>Teacher Login</h3>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" name="email" value={teacherLoginData.email} onChange={handleChange} className="form-control" id="exampleInputEmail1"/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name="password" value={teacherLoginData.password} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
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

export default TeacherLogin;
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import Messages from "../Messages";

const UserLogin = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const [data, setData] = useState({
        'email': '',
        'password': '',
    });

    const handleChange = (event) => {
        setData({
            ...data, [event.target.name]: event.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', data.email)
        formData.append('password', data.password)

        // post to backend
        axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/students/login/`,
            formData,
        )
            .then((response) => {
                localStorage.setItem('studentLoginStatus', true)
                localStorage.setItem('student_id', response.data.student_id)
                localStorage.setItem('student_name', response.data.student_full_name)

                navigate('/user-dashboard');

                toast.success('Login Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch((errors) => {
                setErrors(errors.response.data);
            })
    }

    useEffect(() => {
        document.title="User Login"
    }, [])

    return (
        <div className='container py-5'>
            <div className='row'>
                <div className='col-md-6 offset-3'>
                    <div className='card'>
                        <h3 className='card-header'>Student Login</h3>
                        <div className='card-body'>
                            <form>

                                {
                                    errors && Object.entries(errors).map(([key, value]) => (
                                        <Messages variant="danger" message={`${key.toUpperCase()}: ${value}`} key={key} />
                                    ))
                                }

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" name="email" value={data.email} onChange={handleChange} className="form-control" id="exampleInputEmail1"/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name="password" value={data.password} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
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

export default UserLogin;
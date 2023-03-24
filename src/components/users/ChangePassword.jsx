import React, {useEffect, useState} from 'react';
import Messages from "../Messages";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Sidebar from './Sidebar';

const ChangePassword = () => {
    const navigate = useNavigate();
    const student_id = localStorage.getItem('student_id')

    const [errors, setErrors] = useState([]);
    const [student, setStudent] = useState({})
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    const [formData, setFormData] = useState({
        'pk': '',
        'old_password': '',
        'new_password': '',
        'confirm_password': ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }

    const getStudent = () => {
        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/students/${student_id}/`,
        )
            .then((response) => {
                setStudent(response.data);
            })
    }

    useEffect(() => {
        getStudent();
    }, [])

    const formSubmit = (e) => {
        e.preventDefault();
        setErrors(null);

        const _formData = new FormData();
        _formData.append('pk', student.id)

        _formData.append('old_password', formData.old_password)
        _formData.append('new_password', formData.new_password)
        _formData.append('confirm_password', formData.confirm_password)

        axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/students/password-reset/`,
            _formData
        )
            .then((response) => {
                setFormData(
                    {
                        'pk': '',
                        'old_password': '',
                        'new_password': '',
                        'confirm_password': ''
                    }
                )
                toast.success('Password updated Successfully & Please login again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                localStorage.removeItem('studentLoginStatus')
                localStorage.removeItem('student_id')
                localStorage.removeItem('student_name')
                navigate('/student-login');
            }).catch((errors) => {
            setErrors(errors.response.data);
        })
    }

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
                        <h5 className='card-header'>Change Password</h5>
                        <div className='card-body'>
                            <form className="row g-3">

                                <div className="mb-3 row mt-4">
                                    {
                                        errors && Object.entries(errors).map(([key, value]) => (
                                            <Messages variant="danger" message={`${key.toUpperCase()}: ${value}`} key={key} />
                                        ))
                                    }
                                </div>

                                <div className="mb-3 row mt-4">
                                    <label htmlFor="old_password" className="col-sm-3 col-form-label">Old Password</label>
                                    <div className="col-sm-9">
                                        <input required type="password" name="old_password" className="form-control" id="old_password" onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row mt-4">
                                    <label htmlFor="new_password" className="col-sm-3 col-form-label">New Password</label>
                                    <div className="col-sm-9">
                                        <input required type="password" name="new_password" className="form-control" id="new_password" onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="confirm_password" className="col-sm-3 col-form-label">Confirm Password</label>
                                    <div className="col-sm-9">
                                        <input required type="password" name="confirm_password" className="form-control" id="confirm_password" onChange={handleChange}/>
                                    </div>
                                </div>

                                <hr />
                                <button type="submit" onClick={formSubmit} className="btn btn-success">Save</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ChangePassword;
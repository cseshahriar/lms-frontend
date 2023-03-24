import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import Messages from "../Messages";
import Sidebar from './Sidebar';
import {useNavigate} from "react-router-dom";
import data from "bootstrap/js/src/dom/data";

const ProfileSetting = () => {
    const navigate = useNavigate();
    const student_id = localStorage.getItem('student_id')
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');

    const [errors, setErrors] = useState(null);
    const [student, setStudent] = useState({})
    const [formData, setFormData] = useState({
        'full_name': '',
        'mobile_no': '',
        'email': '',
        'photo': '',
        'skills': '',
        'qualification': '',
        'detail': ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.files[0]
        })
    }

    const getStudent = () => {
        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/students/${student_id}/`,
        )
            .then((response) => {
                setStudent(response.data)
                setFormData({
                    'full_name':  response.data.full_name,
                    'email':  response.data.email,
                    'qualification':  response.data.qualification,
                    'mobile_no':  response.data.mobile_no,
                    'address':  response.data.address,
                    'interested_categories': response.data.interested_categories,
                    'photo':  '',
                });
            })
    }

    useEffect(() => {
        document.title="Profile Setting";
        // login check
        if(studentLoginStatus !== 'true') {
            navigate('/user-login')
        }
        getStudent();
    }, [])

    const formSubmit = (e) => {
        e.preventDefault();
        setErrors(null);

        const _formData = new FormData();
        _formData.append('full_name', formData.full_name)
        _formData.append('mobile_no', formData.mobile_no)
        _formData.append('email', formData.email)
        _formData.append('qualification', formData.qualification)
        _formData.append('address', formData.address)
        _formData.append('interested_categories', formData.interested_categories)

        if(formData.photo !== '') {
            _formData.append('photo', formData.photo)
        }

        axios.patch(
            `${process.env.REACT_APP_API_BASE_URL}/api/students/${student_id}/`,
            _formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        ).then((response) => {
            setFormData(
                {
                    'full_name': '',
                    'mobile_no': '',
                    'email': '',
                    'photo': '',
                    'qualification': '',
                    'address': '',
                    'interested_categories': ''
                }
            )
            toast.success('Profile updated Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getStudent();
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
                        <h5 className='card-header'>Profile Setting</h5>
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
                                    <label htmlFor="full_name" className="col-sm-2 col-form-label">Full Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="full_name" name="full_name" value={formData.full_name}  onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row mt-4">
                                    <label htmlFor="mobile_no" className="col-sm-2 col-form-label">Mobile No</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="mobile_no" name="mobile_no" value={formData.mobile_no}  onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input readOnly type="email" className="form-control" id="staticEmail" value={formData.email} name="email" onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="photo" className="col-sm-2 col-form-label">Profile Photo</label>
                                    <div className="col-sm-10">
                                        <img src={student.photo} alt={student.full_name} className="mb-2" style={{width: '150px', height: '150px'}} />
                                        <input type="file" className="form-control" id="photo" name="photo"  onChange={handleFileChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="interest" className="form-label">Interested Categories</label>
                                    <textarea className="form-control" id="skills" value={formData.interested_categories} name="interested_categories" onChange={handleChange}></textarea>
                                    <div id="interested_categories" className="form-text">PHP, Python, JavaScript</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="qualification" className="form-label">Qualification</label>
                                    <textarea  className="form-control" id="qualification" value={formData.qualification} name="qualification" onChange={handleChange}></textarea>
                                    <div id="emailHelp" className="form-text">PHP, Python, JavaScript</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="detail" className="form-label">Address</label>
                                    <textarea  className="form-control" id="address" value={formData.address} name="address" onChange={handleChange}></textarea>
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

export default ProfileSetting;

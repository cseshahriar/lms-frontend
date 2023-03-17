import React, {useEffect, useState} from 'react';
import TeacherSidebar from './TeacherSidebar';
import {isTeacherAuthenticated} from "../../functions";
import axios from "axios";
import {toast} from "react-toastify";

const TeacherProfileSetting = () => {
    const user_id = localStorage.getItem('user_id')
    const [errors, setErrors] = useState(null);
    const [teacher, setTeacher] = useState({})
    const [teacherData, setTeacherData] = useState({
        'full_name': '',
        'mobile_no': '',
        'email': '',
        'photo': '',
        'skills': '',
        'qualification': '',
        'detail': ''
    });

    const handleChange = (event) => {
        setTeacherData({
            ...teacherData, [event.target.name]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        setTeacherData({
            ...teacherData, [event.target.name]: event.target.files[0]
        })
    }

    const getTeacher = () => {
        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/teachers/${user_id}/`,
        )
        .then((response) => {
            setTeacher(response.data)

            setTeacherData({
                'full_name':  response.data.full_name,
                'mobile_no':  response.data.mobile_no,
                'email':  response.data.email,
                'photo':  '',
                'skills':  response.data.skills,
                'qualification':  response.data.qualification,
                'detail': response.data.detail,
            });
        })
    }

    useEffect(() => {
        isTeacherAuthenticated();
        getTeacher();
    }, [])

    const formSubmit = (e) => {
        e.preventDefault();
        setErrors(null);

        const _formData = new FormData();
        _formData.append('full_name', teacherData.full_name)
        _formData.append('mobile_no', teacherData.mobile_no)
        _formData.append('email', teacherData.email)

        if(teacherData.photo !== '') {
            _formData.append('photo', teacherData.photo)
        }

        _formData.append('skills', teacherData.skills)
        _formData.append('qualification', teacherData.qualification)
        _formData.append('detail', teacherData.detail)

        axios.patch(
            `${process.env.REACT_APP_API_BASE_URL}/api/teachers/${user_id}/`,
            _formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        ).then((response) => {
            setTeacherData(
                {
                    'full_name': '',
                    'mobile_no': '',
                    'email': '',
                    'photo': '',
                    'skills': '',
                    'qualification': '',
                    'detail': ''
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
            getTeacher();
        }).catch((errors) => {
            setErrors(errors.response.data);
        })
    }

    console.log(teacherData);

    return (
        <div className='container py-5'>
            <div className='row'>
                {/* aside */}
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>

                {/* content */}
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Profile Setting</h5>
                        <div className='card-body'>
                            <form className="row g-3">
                                
                                <div className="mb-3 row mt-4">
                                    <label htmlFor="full_name" className="col-sm-2 col-form-label">Full Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="full_name" name="full_name" value={teacherData.full_name}  onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row mt-4">
                                    <label htmlFor="mobile_no" className="col-sm-2 col-form-label">Mobile No</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="mobile_no" name="mobile_no" value={teacherData.mobile_no}  onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input readOnly type="email" className="form-control" id="staticEmail" value={teacherData.email} name="email" onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="photo" className="col-sm-2 col-form-label">Profile Photo</label>
                                    <div className="col-sm-10">
                                        <img src={teacher.photo} alt={teacher.full_name} className="mb-2" style={{width: '150px', height: '150px'}} />
                                        <input type="file" className="form-control" id="photo" name="photo"  onChange={handleFileChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="interest" className="form-label">Skills</label>
                                    <textarea className="form-control" id="skills" value={teacherData.skills} name="skills" onChange={handleChange}></textarea>
                                    <div id="emailHelp" className="form-text">PHP, Python, JavaScript</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="qualification" className="form-label">Qualification</label>
                                    <textarea  className="form-control" id="qualification" value={teacherData.qualification} name="qualification" onChange={handleChange}></textarea>
                                    <div id="emailHelp" className="form-text">PHP, Python, JavaScript</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="detail" className="form-label">Detail</label>
                                    <textarea  className="form-control" id="detail" value={teacherData.detail} name="detail" onChange={handleChange}></textarea>
                                    <div id="emailHelp" className="form-text">PHP, Python, JavaScript</div>
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

export default TeacherProfileSetting;

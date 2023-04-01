import React, { useEffect, useState } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import { isTeacherAuthenticated } from "../../functions";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Messages from "../Messages";

const AddAssignment = () => {
    const { student_id } = useParams();
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    console.log('student id', student_id, ' user id', user_id)

    // states
    const [student, setStudent] = useState([]);
    const [errors, setErrors] = useState([]);
    const [ isAlertVisible, setIsAlertVisible ] = useState(false);

    const [data, setData] = useState({
        'title': '',
        'detail': '',
    });

    useEffect(() => {
        document.title="Add Assignment"
        // auth check
        isTeacherAuthenticated();

        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/students/${student_id}`,
        )
            .then((response) => {
                setStudent(response.data)
            })
            .catch((errors) => {
                setErrors(errors.response.data);
            })

    }, [])

    const handleChange = (event) => {
        setData({
            ...data, [event.target.name]: event.target.value
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('teacher', parseInt(user_id))
        _formData.append('student', parseInt(student_id))
        _formData.append('title', data.title)
        _formData.append('detail', data.detail)

        axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/assignments/`,
            _formData,
        ).then((response) => {
            setData({
                'title': '',
                'detail': '',
            })
            Swal.fire({
                title: 'Data has been created',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showCancelButton: false
            })
            navigate('/teacher-users-list');
        })
            .catch((errors) => {
                setErrors(errors.response.data);
            })

    }

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
                        <h5 className="card-header">Add Assignment for { student && student.full_name }</h5>
                        <div className='card-body'>
                            <form>
                                {
                                    errors && Object.entries(errors).map(([key, value]) => (
                                        <Messages variant="danger" message={`${key.toUpperCase()}: ${value}`} key={key} />
                                    ))
                                }

                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input required type="text" className="form-control" id="title" name='title' value={data.title} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="detail" className="col-sm-2 col-form-label">Detail</label>
                                    <div className="col-sm-10">
                                        <textarea required name="detail" className="form-control" id="detail" value={data.detail} onChange={handleChange}></textarea>
                                    </div>
                                </div>

                                <div className="mb-3 text-center">
                                    <button onClick={formSubmit} type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AddAssignment;
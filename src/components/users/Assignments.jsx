import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Sidebar from './Sidebar';
import {isTeacherAuthenticated} from "../../functions";
import axios from "axios";
import Messages from "../Messages";
import {toast} from "react-toastify";

const StudentAssignments = () => {
    const navigate = useNavigate();

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    const student_id = localStorage.getItem('student_id');

    const [data, setData] = useState([]);
    const [student, setStudent] = useState();
    const [errors, setErrors] = useState([]);

    const getData = () => {
        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/assignments/?student_id=${student_id}`,
        )
            .then((response) => {
                setData(response.data)
            })
            .catch((errors) => {
                console.log(errors.response.data)
                setErrors(errors.response.data);
            })
    }
    useEffect(() => {
        document.title="My Assignments";

        // login check
        if(studentLoginStatus !== 'true') {
            navigate('/user-login')
        }
        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/students/${student_id}`,
        )
        .then((response) => {
            setStudent(response.data)
        })
        .catch((errors) => {
            setErrors(errors.response.data);
        })

        getData();

    }, [])

    if(errors.length > 0) {
        return <Messages variant='danger' message={errors} />
    }

    const makeDone = (id) => {
        const _formData = new FormData();
        _formData.append('student_status', true)
        axios.patch(
            `${process.env.REACT_APP_API_BASE_URL}/api/assignments/${id}`,
            _formData
        )
        .then((response) => {
            toast.success('Assignment status updated Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getData();
        }).catch((errors) => {
            setErrors(errors.response.data);
        })
    }

    if(data) {
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
                            <h5 className='card-header'>My Assignments</h5>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Title</th>
                                            <th>Detail</th>
                                            <th>Date</th>
                                            <th>Teacher</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        data && data.map((assignment, index) => (
                                            <tr key={index}>
                                                <td>{ index + 1 }</td>
                                                <td>{ assignment.title }</td>
                                                <td>{assignment.detail }</td>
                                                <td>{assignment.created_at }</td>
                                                <td>{ assignment.teacher.full_name }</td>
                                                <td>
                                                    {
                                                        assignment.student_status != true ?
                                                            <button onClick={() => makeDone(assignment.id)} className='btn btn-primary btn-sm'>Mark as Done</button>
                                                            :
                                                            <span className='badge bg-success'>Completed</span>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default StudentAssignments;
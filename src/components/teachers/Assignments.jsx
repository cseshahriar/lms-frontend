import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {isTeacherAuthenticated} from "../../functions";
import axios from "axios";
import Messages from "../Messages";

const Assignments = () => {
    const { student_id } = useParams();
    const user_id = localStorage.getItem('user_id')
    const [data, setData] = useState([]);
    const [student, setStudent] = useState();
    const [errors, setErrors] = useState([]);


    useEffect(() => {
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
    }, [])

    if(errors.length > 0) {
        return <Messages variant='danger' message={errors} />
    }

    if(data) {
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
                            <h5 className='card-header'>Assignments of { student && student.full_name }</h5>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Title</th>
                                        <th>Detail</th>
                                        <th>Date</th>
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

export default Assignments;
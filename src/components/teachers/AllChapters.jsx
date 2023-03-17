import React, { useEffect, useState } from 'react';
import {Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Loader from "../Loader";
import Messages from "../Messages";

import TeacherSidebar from './TeacherSidebar';
import {isTeacherAuthenticated} from "../../functions";

const AllChapters = () => {
    const navigate = useNavigate();
    const [chapters, setChapters] = useState([]);
    const [totalResult, setTotalResult] = useState(0);

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { course_id } = useParams();

    const getChapters = async () => {
        setLoading(true);
        const data = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/courses/${course_id}/chapters/`,
        )
        .then((response) => {
            setChapters(response.data);
            setTotalResult(response.data.length);
        }).catch(error => setError(error));
        setLoading(false);
    };

    useEffect(() => {
        isTeacherAuthenticated();
        getChapters();
    }, [])


    const handleDeleteClick = (id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure want to delete it?',
            icon: 'info',
            confirmButtonText: 'Continue',
            // showConfirmButton: true,
            showCancelButton: true
        })
        .then((result) => {
            if (result['isConfirmed']){
                // Put your function here
                try {
                    axios.delete(
                        `${process.env.REACT_APP_API_BASE_URL}/api/chapters/${parseInt(id)}/`,
                        {
                            headers: {
                                'content-type': 'multipart/form-data'
                            }
                        }
                    ).then((response) => {
                        if(response.status == 204) {
                            Swal.fire({
                                title: 'Data has been deleted',
                                icon: 'success',
                                toast: true,
                                timer: 3000,
                                position: 'top-right',
                                timerProgressBar: true,
                                showCancelButton: false
                            })
                            getChapters();
                        }
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }

    return (
        <div className="container py-5">
            <div className='row'>
                {/* aside */}
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>

                {/* content */}
                <section className='col-md-9'>
                    <div className='card'>
                        {
                            isLoading ? <Loader/> : error ? <Messages variant="danger" message={error} /> : (
                                <>
                                    <h5 className='card-header'>
                                        All Chapters ({totalResult})
                                        <span className='d-inline-block float-end'>
                                            <Link className='btn btn-sm btn-success ms-2' to={`/courses/${course_id}/add-chapter/`}> Add Chapter</Link>
                                        </span>
                                    </h5>
                                    <div className='card-body'>
                                        <div className='table-responsive'>
                                            <table className='table table-bordered'>
                                                <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Title</th>
                                                    <th>Video</th>
                                                    <th>Remarks</th>
                                                    <th>Duration</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {
                                                    chapters && chapters.map((chapter, index) => (
                                                        <tr key={index}>
                                                            <td>{ index + 1}</td>
                                                            <td><Link to={`/chapters/${chapter.id}/edit/`}>{ chapter.title }</Link></td>
                                                            <td>
                                                                <video width="250" controls>
                                                                    <source src={ chapter.video } type="video/webm"/>
                                                                    <source src={ chapter.video } type="video/mp4" />
                                                                    Your browser does not support the video tag
                                                                </video>
                                                            </td>
                                                            <td>{ chapter.remarks }</td>
                                                            <td>{ chapter.duration }</td>
                                                            <td>
                                                                <Link to={`/chapters/${chapter.id}/edit/`} className='btn btn-info btn-sm text-white'>
                                                                    <i  className="bi bi-pencil-square"></i>
                                                                </Link>
                                                                <button onClick={ () => handleDeleteClick(chapter.id) } className='btn btn-danger btn-sm ms-1 text-white'>
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AllChapters;
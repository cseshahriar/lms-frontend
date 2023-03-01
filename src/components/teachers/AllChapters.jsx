import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Loader from "../Loader";
import Messages from "../Messages";

import TeacherSidebar from './TeacherSidebar';
import {isTeacherAuthenticated} from "../../functions";

const AllChapters = () => {
    const [chapters, setChapters] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { course_id } = useParams();

    const getChapters = async () => {
        setLoading(true);
        const data = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/courses/${course_id}/chapters/`,
        )
        .then((response) => {
            setChapters(response.data)
        }).catch(error => setError(error));
        setLoading(false);
    };

    useEffect(() => {
        isTeacherAuthenticated();
        getChapters();

    }, [course_id])

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
                                    <h5 className='card-header'>All Chapters</h5>
                                    <div className='card-body'>
                                        <div className='table-responsive'>
                                            <table className='table table-bordered'>
                                                <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Title</th>
                                                    <th>Video</th>
                                                    <th>Remarks</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {
                                                    chapters && chapters.map((chapter, index) => (
                                                        <tr key={index}>
                                                            <td>{ index + 1}</td>
                                                            <td>{ chapter.title }</td>
                                                            <td>
                                                                <video width="250" controls>
                                                                    <source src={ chapter.video } type="video/webm"/>
                                                                    <source src={ chapter.video } type="video/mp4" />
                                                                    Your browser does not support the video tag
                                                                </video>
                                                            </td>
                                                            <td>{ chapter.remarks }</td>
                                                            <td>
                                                                <button className='btn btn-info btn-sm'>Edit</button>
                                                                <button className='btn btn-danger btn-sm ms-1'>Delete</button>
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
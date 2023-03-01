import React, { useEffect, useState } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import { isTeacherAuthenticated } from "../../functions";

import axios from "axios";
import {redirect, useNavigate, useParams} from "react-router-dom";

const EditChapter = () => {
    const navigate = useNavigate();
    const { chapter_id } = useParams();

    const user_id = localStorage.getItem('user_id');
    const [chapter, setChapter] = useState(null);

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // states
    const [errors, setErrors] = useState([]);
    const [ isAlertVisible, setIsAlertVisible ] = useState(false);

    const [chapterData, setChapterData] = useState({
        'course': '',
        'title': '',
        'description': '',
        'prev_video': '',
        'video': '',
        'remarks': '',
    });

    const getchapter = async () => {
        setLoading(true);
        const data = await axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/chapters/${chapter_id}`)
            .then((response) => {
                setChapter(response.data);
                setChapterData({
                    'title': response.data.title,
                    'description': response.data.description,
                    'prev_video': response.data.video,
                    'remarks': response.data.remarks,
                    'video': ''
                })
            })
            .catch(error => setError(error));
        setLoading(false);
    };


    useEffect(() => {
        isTeacherAuthenticated();
        getchapter();
    }, [])

    const handleChange = (event) => {
        setChapterData({
            ...chapterData, [event.target.name]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        setChapterData({
            ...chapterData, [event.target.name]: event.target.files[0]
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('title', chapterData.title)
        _formData.append('description', chapterData.description)

        if(chapterData.video !== '') {
            _formData.append('video', chapterData.video)
        }

        _formData.append('remarks', chapterData.remarks)

        try {
            axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/api/chapters/${parseInt(chapter_id)}/`,
                _formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                setChapterData({
                    'course': '',
                    'title': '',
                    'description': '',
                    'video': '',
                    'remarks': '',
                })
                setIsAlertVisible(true);
                navigate('/teacher-courses');
            })
        } catch (error) {
            console.log(error);
        }
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
                        {
                            isAlertVisible &&
                            chapterData.status === 'success' && <p className="text-success" id="success">Thanks for your registration</p>
                        }
                        <h5 className="card-header">Edit Chapter</h5>
                        <div className='card-body'>
                            <form>

                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input required type="text" className="form-control" id="title" name='title' value={chapterData.title} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea name='description' className='form-control' id='description' value={chapterData.description} onChange={handleChange}></textarea>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="video" className="col-sm-2 col-form-label">Video</label>
                                    <div className="col-sm-10">
                                        {
                                            chapter &&  <video width="100%" controls className='mb-2'>
                                                <source src={ chapter.video } type="video/webm"/>
                                                <source src={ chapter.video } type="video/mp4" />
                                                Your browser does not support the video tag
                                            </video>
                                        }
                                        <input type='file' required name="video" className="form-control" id="video" onChange={handleFileChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="remarks" className="col-sm-2 col-form-label">Technologies</label>
                                    <div className="col-sm-10">
                                        <textarea required name="remarks" className="form-control" id="remarks" value={chapterData.remarks} onChange={handleChange}></textarea>
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

export default EditChapter;
import React, { useEffect, useState } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import { isTeacherAuthenticated } from "../../functions";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddChapter = () => {
    const { course_id } = useParams();
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();

    // states
    const [error, setError] = useState(null);
    const [ isAlertVisible, setIsAlertVisible ] = useState(false);
    const [categories, setCategories] = useState([]);

    const [chapterData, setChapterData] = useState({
        'course': '',
        'title': '',
        'description': '',
        'video': '',
        'remarks': '',
    });

    useEffect(() => {
        // auth check
        isTeacherAuthenticated();

        // fetch
        try {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/categories/`)
                .then(response => {
                    setCategories(response.data)
                })
        } catch (error) {
            console.log(error);
        }

    }, [user_id, ])

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
        _formData.append('course', parseInt(course_id))
        _formData.append('title', chapterData.title)
        _formData.append('description', chapterData.description)
        _formData.append('video', chapterData.video)
        _formData.append('remarks', chapterData.remarks)

        try {
            axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/chapter/`,
                _formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                console.log(response.data)
                setChapterData({
                    'title': '',
                    'description': '',
                    'video': '',
                    'remarks': '',
                })
                setIsAlertVisible(true);
                setTimeout(function () {
                    setIsAlertVisible(false);
                    navigate('/teacher-courses');
                }, 3000);
            })
        } catch (error) {
            setError(error);
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
                        { chapterData.status === 'error' && <p className="text-danger">Something went wrong! Please try again.</p>}


                        <h5 className="card-header">Add Chapter</h5>
                        <div className='card-body'>
                            <form>

                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input required type="text" className="form-control" id="title" name='title' value={chapterData.title} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <textarea name='description' className='form-control' id='description' value={chapterData.description} onChange={handleChange}></textarea>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="video" className="col-sm-2 col-form-label">Video</label>
                                    <div className="col-sm-10">
                                        <textarea required name="video" className="form-control" id="video" value={chapterData.description} onChange={handleChange}></textarea>
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

export default AddChapter;
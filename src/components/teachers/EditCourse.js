import React, { useEffect, useState } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import { isTeacherAuthenticated } from "../../functions";

import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const EditCourse = () => {
    const navigate = useNavigate();
    const { course_id } = useParams();
    const user_id = localStorage.getItem('user_id')

    // states
    const [error, setError] = useState(null);
    const [ isAlertVisible, setIsAlertVisible ] = useState(false);
    const [categories, setCategories] = useState([]);

    const [courseData, setCourseData] = useState({
        'category': '',
        'teacher': parseInt(user_id),
        'title': '',
        'description': '',
        'technologies': '',
        'featured_img': '',
        'status': ''
    });

    const getCategory = () => {
        try {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/categories/`)
                .then(response => {
                    setCategories(response.data)
                })
        } catch (error) {
            console.log(error);
        }
    }

    const getCourse = () => {
        try {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/courses/${course_id}`)
                .then(response => {
                    setCourseData(response.data)
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        isTeacherAuthenticated();
        getCategory();
        getCourse();
    }, [])

    const handleChange = (event) => {
        setCourseData({
            ...courseData, [event.target.name]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        setCourseData({
            ...courseData, [event.target.name]: event.target.files[0]
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('category', courseData.category.id)
        _formData.append('title', courseData.title)
        _formData.append('description', courseData.description)
        if(courseData.featured_img) {
            _formData.append('featured_img', courseData.featured_img)
        }
        _formData.append('technologies', courseData.technologies)
        try {
            axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/api/courses/${course_id}/`,
                _formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                console.log(response.data)
                setCourseData({
                    'category': response.data.category,
                    'title': response.data.title,
                    'description': response.data.description,
                    'technologies': response.data.technologies,
                    'featured_img': response.data.featured_img,
                    'status': 'success'
                })
                setIsAlertVisible(true);
                setTimeout(function () {
                    setIsAlertVisible(false);
                    navigate('/teacher-courses');
                }, 3000);
            })
        } catch (error) {
            setError(error);
            setCourseData({'status': 'error'});
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
                            courseData.status === 'success' && <p className="text-success p-2" id="success">Course has been updated.</p>
                        }
                        { courseData.status === 'error' && <p className="text-danger p-2">Something went wrong! Please try again.</p>}


                        <h5 className="card-header">Edit Course</h5>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3 row">
                                    <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <select required className="form-select" name='category' onChange={handleChange}>
                                            <option value="" disabled>Select Category</option>
                                            {
                                                categories && categories.map((category) => (
                                                    <option key={category.id} value={category.id} selected={category.id === courseData.category.id }>{category.title}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input required type="text" className="form-control" id="title" name='title' value={courseData.title} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea required name="description" className="form-control" id="description" value={courseData.description} onChange={handleChange}></textarea>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="featured_img" className="col-sm-2 col-form-label">Featured Image</label>
                                    <div className="col-sm-10">
                                        <input required type="file" name="featured_img" className="form-control" id="featured_img"  onChange={handleFileChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="technologies" className="col-sm-2 col-form-label">Technologies</label>
                                    <div className="col-sm-10">
                                        <textarea required name="technologies" className="form-control" id="technologies" value={courseData.technologies} onChange={handleChange}></textarea>
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

export default EditCourse;
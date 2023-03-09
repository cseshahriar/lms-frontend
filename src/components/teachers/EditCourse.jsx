import React, { useEffect, useState } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import { isTeacherAuthenticated } from "../../functions";

import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Messages from "../Messages";
import {toast} from "react-toastify";

const EditCourse = () => {
    const navigate = useNavigate();
    const { course_id } = useParams();
    const user_id = localStorage.getItem('user_id')

    // states
    const [errors, setErrors] = useState(null);
    const [categories, setCategories] = useState([]);

    const [courseData, setCourseData] = useState({
        'category': '',
        'title': '',
        'description': '',
        'technologies': '',
        'featured_img': '',
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
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/courses/${course_id}`)
            .then(response => {
                setCourseData({
                    'category': response.data.category,
                    'title': response.data.title,
                    'description': response.data.description,
                    'technologies': response.data.technologies,
                    'featured_img': '',
                })
            }).catch((errors) => {
                setErrors(errors.response.data);
            })
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
        _formData.append('technologies', courseData.technologies)
        _formData.append('description', courseData.description)

        if(courseData.featured_img) {
            console.log('img', courseData.featured_img);
            _formData.append('featured_img', courseData.featured_img)
        }
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
            })
            navigate('/teacher-courses');
            toast.success('Course updated Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
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
                        {
                            errors && Object.entries(errors).map(([key, value]) => (
                                <Messages variant="danger" message={`${key.toUpperCase()}: ${value}`} key={key} />
                            ))
                        }

                        <h5 className="card-header">Edit Course</h5>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3 row">
                                    <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <select required className="form-select" name='category' onChange={handleChange} value={courseData.category.id}>
                                            <option value="" disabled>Select Category</option>
                                            {
                                                categories && categories.map((category) => (
                                                    <option key={category.id} value={category.id}>{category.title}</option>
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
                                        <input type="file" name="featured_img" className="form-control" id="featured_img"  onChange={handleFileChange} />
                                        <img src={courseData.featured_img} alt='' className='mt-2 img-thumbnail' />
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
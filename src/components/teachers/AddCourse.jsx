import React, { useEffect, useState } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import { isTeacherAuthenticated } from "../../functions";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import Messages from "../Messages";
import {toast} from "react-toastify";

const AddCourse = () => {
    const user_id = localStorage.getItem('user_id')
    const navigate = useNavigate();

    // states
    const [errors, setErrors] = useState(null);
    const [categories, setCategories] = useState([]);

    const [courseData, setCourseData] = useState({
        'category': '',
        'teacher': parseInt(user_id),
        'title': '',
        'description': '',
        'technologies': '',
        'featured_img': '',
    });

    useEffect(() => {
        // auth check
        isTeacherAuthenticated();

        // fetch
        try {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/categories/`)
                .then(response => {
                    setCategories(response.data);
                }).catch((errors) => {
            })
        } catch (error) {
            console.log(error);
        }

    }, [user_id, ])

    const handleChange = (event) => {
        setCourseData({
            ...courseData, [event.target.name]: event.target.value
        })
        console.log('event change', courseData);
    }

    const handleFileChange = (event) => {
        setCourseData({
            ...courseData, [event.target.name]: event.target.files[0]
        })
    }

    const category_validation = (value) => {
        if(value === '') {
            setErrors({'category': 'Category is required.'})
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();
        setErrors(null);
        category_validation(courseData.category);

        const _formData = new FormData();
        _formData.append('category', courseData.category)
        _formData.append('teacher', courseData.teacher)
        _formData.append('title', courseData.title)
        _formData.append('description', courseData.description)
        _formData.append('featured_img', courseData.featured_img)
        _formData.append('technologies', courseData.technologies)

        axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/courses/`,
            _formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        ).then((response) => {
            setCourseData({
                'category': '',
                'teacher': '',
                'title': '',
                'description': '',
                'course_video': '',
                'technologies': '',
                'featured_img': '',
            })
            navigate('/teacher-courses');
            toast.success('Course added Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }).catch((errors) => {
            setErrors(errors.response.data);
            console.log('err', errors)
        })
    }

    console.log('course data', courseData)

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

                        <h5 className="card-header">Add Course</h5>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3 row">
                                    <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <select required className="form-select" name='category' onChange={handleChange}>
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

export default AddCourse;
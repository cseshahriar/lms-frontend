import React, { useEffect, useState } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import { isTeacherAuthenticated } from "../../functions";

import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddCourse = () => {
    const user_id = localStorage.getItem('user_id')
    const navigate = useNavigate();

    // states
    const [error, setError] = useState(null);
    const [ isAlertVisible, setIsAlertVisible ] = React.useState(false);
    const [categories, setCategories] = useState([]);

    const [courseData, setCourseData] = useState({
        'category': '',
        'teacher': '',
        'title': '',
        'description': '',
        'technologies': '',
        'featured_img': '',
        'status': ''
    });

    useEffect(() => {
        // auth check
        isTeacherAuthenticated();
        try {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/categories/`)
                .then(response => {
                    setCategories(response.data)
                })
        } catch (error) {
            console.log(error);
        }
    }, [ ])

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
        _formData.append('category', courseData.category)
        _formData.append('teacher', user_id)
        _formData.append('title', courseData.title)
        _formData.append('description', courseData.description)
        _formData.append('featured_img', courseData.featured_img)
        _formData.append('technologies', courseData.technologies)

        try {
            axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/courses/`,
                _formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                console.log(response.data)
                setCourseData({
                    'category': '',
                    'teacher': '',
                    'title': '',
                    'description': '',
                    'course_video': '',
                    'technologies': '',
                    'featured_img': '',
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
                            courseData.status == 'success' && <p className="text-success" id="success">Thanks for your registration</p>
                        }
                        { courseData.status == 'error' && <p className="text-danger">Something went wrong! Please try again.</p>}


                        <h5 className="card-header">Add Course</h5>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3 row">
                                    <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <select className="form-select" name='category' onChange={handleChange}>
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
                                        <input type="text" className="form-control" id="title" name='title' value={courseData.title} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea name="description" className="form-control" id="description" name='description' value={courseData.description} onChange={handleChange}></textarea>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="featured_img" className="col-sm-2 col-form-label">Featured Image</label>
                                    <div className="col-sm-10">
                                        <input type="file" name="featured_img" className="form-control" id="featured_img"  onChange={handleFileChange} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="technologies" className="col-sm-2 col-form-label">Technologies</label>
                                    <div className="col-sm-10">
                                        <textarea name="technologies" className="form-control" id="technologies" name='technologies' value={courseData.technologies} onChange={handleChange}></textarea>
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
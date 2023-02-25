import React, { useEffect } from 'react';
import TeacherSidebar from "./TeacherSidebar";
import {isTeacherAuthenticated} from "../../functions";

const AddCourse = () => {
    useEffect(() => {
        isTeacherAuthenticated();
    })
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
                        <h5 className="card-header">Add Course</h5>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="title"/>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea name="description" className="form-control" id="description"></textarea>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="photo" className="col-sm-2 col-form-label">Course Video</label>
                                    <div className="col-sm-10">
                                        <input type="file" name="course_video" className="form-control" id="course_video"/>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="technologies" className="col-sm-2 col-form-label">Technologies</label>
                                    <div className="col-sm-10">
                                        <textarea name="technologies" className="form-control" id="technologies"></textarea>
                                    </div>
                                </div>

                                <div className="mb-3 text-center">
                                    <button type="submit" className="btn btn-primary">Submit</button>
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
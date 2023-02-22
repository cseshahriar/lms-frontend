import React from 'react';
import TeacherSidebar from "./TeacherSidebar";

const AddCourse = () => {
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
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title"/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea name="description" className="form-control" id="description"></textarea>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="photo" className="col-sm-2 col-form-label">Course Video</label>
                                    <div className="col-sm-10">
                                        <input type="file" name="course_video" className="form-control" id="course_video"/>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="technologies" className="form-label">Technologies</label>
                                    <textarea name="technologies" className="form-control" id="technologies"></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AddCourse;
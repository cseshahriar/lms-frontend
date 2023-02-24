import React, {useEffect} from 'react';
import TeacherSidebar from './TeacherSidebar';


const TeacherDashboard = () => {

    useEffect(() => {
        document.title="Teacher Login"
    })

    return (
        <div className='container py-5'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>
                
                <section className='col-md-9'>
                    Teacher Dashboard
                </section>

            </div>
        </div>
    );
};

export default TeacherDashboard;

import React from 'react';
import Sidebar from './Sidebar';


const UserDashboard = () => {
    return (
        <div className='container py-5'>
            <div className='row'>
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                
                <section className='col-md-9'>
                    Dashboard
                </section>

            </div>
        </div>
    );
};

export default UserDashboard;

import React, {useEffect} from 'react';

const About = () => {
    useEffect(() => {
        document.title="LMS About Page"
    })

    return (
        <div className='container pt-5'>
            <div className='row'>
                <h1>About Us Page</h1>
            </div>
        </div>
    );
};

export default About;
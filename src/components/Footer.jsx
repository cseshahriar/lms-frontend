import React from 'react';

const Footer = () => {
    return (
        <footer className="text-muted py-5 border-top mt-5">
            <div className="container">
                <p className="float-end mb-1">
                    <a href="#navbar">Back to top</a>
                </p>
                <p className="mb-1">Copyright &copy; {(new Date().getFullYear())}  LMS All right reserved</p>
            
            </div>
        </footer>
    );
};

export default Footer;
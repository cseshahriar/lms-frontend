import React from 'react';
const Loader = () => {
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-4 offset-4 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Loader;
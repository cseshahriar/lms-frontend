import React from 'react';

const Home = () => {
    return (
        <div className="container mt-4">
            {/* latest courses */}
            <h1 className="pd-1 mb-4">Latest Courses</h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <a href='/'>
                            <img src="logo512.png" className="card-img-top" alt="" />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <a href='/'>Course title</a>
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card">
                        <a href='/'>
                            <img src="logo512.png" className="card-img-top" alt="" />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <a href='/'>Course title</a>
                            </h5>
                        </div>
                    </div>
                </div>


            </div>
            {/* End latest courses */}



            {/* popular courses */}
            <h1 className="pd-1 mb-4 mt-5">Popular Courses</h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <a href='/'>
                            <img src="logo512.png" className="card-img-top" alt="" />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <a href='/'>Course title</a>
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card">
                        <a href='/'>
                            <img src="logo512.png" className="card-img-top" alt="" />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <a href='/'>Course title</a>
                            </h5>
                        </div>
                    </div>
                </div>


            </div>
            {/* End Popular courses */}

    
        </div>
    );
};

export default Home;
import React from 'react';

// components
import Home from './Home';
import Navbar from './Navbar';

const Main = () => {
    return (
        <div className='App'>
            <Navbar/>
            <Home/>
        </div>
    );
};

export default Main;
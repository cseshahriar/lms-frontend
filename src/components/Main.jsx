import React from 'react';

// components
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = () => {
    return (
        <div className='App'>
            <Navbar/>
            <Home/>
            <Footer/>
        </div>
    );
};

export default Main;
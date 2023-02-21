import React from 'react';
import { Routes, Route } from "react-router-dom";

// ============================ components ====================================

import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';


import About from './About';


const Main = () => {
    return (
        <div className='App'>
            <Navbar/>
            
            {/* routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>

            <Footer/>
        </div>
    );
};

export default Main;
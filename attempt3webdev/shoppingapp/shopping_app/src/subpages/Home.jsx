import React, { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './css/home.css';
import ring from '../assets/randoring.jpg';


function Home() {
    const [IsOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h1>Home Page</h1>
            <h2>Welcome to our Jewelry Store!</h2>
            <p>Discover our exclusive collection of exquisite jewelry pieces 
                that blend timeless elegance with modern design. 
                Whether you're looking for the perfect engagement ring, 
                a stylish bracelet, or a unique necklace, we have something 
                special for every occasion.</p>
            <div className="items-of-homepage">
                <div className="item-card">
                    <img src={ring} alt="Random Ring" onClick={() => setIsOpen(!IsOpen)}/>
                    <div className={`item-info ${IsOpen ? 'expanded' : ''}`}>
                        <h3>Ring Name</h3>
                        <p>Ring Description</p>
                        <p>Price: $99.99</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
                
            </div>
            <p>Welcome to the Home page.</p>
        </div>
    );
}
export default Home;
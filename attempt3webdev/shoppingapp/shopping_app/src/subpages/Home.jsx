import React, { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './css/home.css';
import ring from '../assets/randoring.jpg';

function showItemDetails() {
    return(
        <div className="deals-display-area">
            <div className="deal-container">
                <div className="item-card-vertical">
                    <img src={ring} alt="Random Ring"/>
                    <div className={`item-info-vertical`}>
                        <h3>Ring Name</h3>
                        <p>Original Price: <i>$199.99</i></p>
                        <p>Price: <i>$99.99</i></p>
                        <button>Add to Cart</button>
                    </div>
                </div>
                <div className="item-card-vertical">
                    <img src={ring} alt="Random Ring"/>
                    <div className="item-info-vertical">
                        <h3>Ring Name</h3>
                        <p>Original Price: <i>$199.99</i></p>
                        <p>Price: <i>$99.99</i></p>
                        <button>Add to Cart</button>
                    </div>
                </div>
                <div className="item-card-vertical">
                    <img src={ring} alt="Random Ring"/>
                    <div className={`item-info-vertical`}>
                        <h3>Ring Name</h3>
                        <p>Original Price: <i>$199.99</i></p>
                        <p>Price: <i>$99.99</i></p>
                        <button>Add to Cart</button>
                    </div>
                </div>
                <div className="item-card-vertical">
                    <img src={ring} alt="Random Ring"/>
                    <div className="item-info-vertical">
                        <h3>Ring Name</h3>
                        <p className="original-price">Original Price: <i>$199.99</i></p>
                        <p>Price: <i>$99.99</i></p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
            
            <div className="deals-routes">
                <Link className="deals-link" to="/bestdeals">Best Deals</Link>
                
            </div>
        </div>
    );
}

function Home() {
    const [IsOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className="body-text">
                <h1>Home Page</h1>
                <h2>Welcome to our Jewelry Store!</h2>
                <p>Discover our exclusive collection of exquisite jewelry pieces 
                    that blend timeless elegance with modern design. 
                    Whether you're looking for the perfect engagement ring, 
                    a stylish bracelet, or a unique necklace, we have something 
                    special for every occasion.</p>
            </div>
            <div className="items-of-homepage">
                <h3 className="header-text">Top Sellers:</h3>
                <div className="items-of-homepage-container">
                    <div className="item-card">
                        <img src={ring} alt="Random Ring" onClick={() => setIsOpen(!IsOpen)}/>
                        <div className={`item-info ${IsOpen ? 'expanded' : ''}`}>
                            <h3>Ring Name</h3>
                            <p>Ring Description</p>
                            <p>Price: <i>$99.99</i></p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                    <div className="item-card">
                        <img src={ring} alt="Random Ring" onClick={() => setIsOpen(!IsOpen)}/>
                        <div className={`item-info ${IsOpen ? 'expanded' : ''}`}>
                            <h3>Ring Name</h3>
                            <p>Ring Description</p>
                            <p>Price: <i>$99.99</i></p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                    <div className="item-card">
                        <img src={ring} alt="Random Ring" onClick={() => setIsOpen(!IsOpen)}/>
                        <div className={`item-info ${IsOpen ? 'expanded' : ''}`}>
                            <h3>Ring Name</h3>
                            <p>Ring Description</p>
                            <p>Price: <i>$99.99</i></p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-text">
                <h2>Top deals!</h2>
                <p>Check out our limited-time offers and exclusive 
                    discounts on selected items. 
                    Don't miss out on these incredible deals!</p>
                <div className="deals-container (blank)">
                    {showItemDetails()}
                </div>
            </div>
            <p>Welcome to the Home page.</p>
        </div>
    );
}
export default Home;
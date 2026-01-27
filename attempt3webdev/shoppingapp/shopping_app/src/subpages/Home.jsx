import React, { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './css/home.css';
import ring from '../assets/randoring.jpg';
import necklace from '../assets/necklacemodel.jpg';
import BestDeals from './bestdeals.jsx'
import Inventory from "./inventory.jsx";

const deals = [
    {
        id: 1,
        name: "Ring Name",
        originalPrice: 199.99,
        discountedPrice: 99.99,
        image: ring
    },
    {
        id: 2,
        name: "Ring Name",
        originalPrice: 199.99,
        discountedPrice: 99.99,
        image: ring
    },
    {
        id: 3,
        name: "Ring Name",
        originalPrice: 199.99,
        discountedPrice: 99.99,
        image: ring
    },
    {
        id: 4,
        name: "Ring Name",
        originalPrice: 199.99,
        discountedPrice: 99.99,
        image: ring
    },
]



function showItemDetails() {
    return(
        <div className="deals-display-area">
            <div className="deal-container">
                {deals.map((deal) => (
                    <div className="item-card-vertical" key={deal.id}>
                        <img src={deal.image} alt="Random Ring"/>
                        <div className="item-info-vertical">
                            <h3>{deal.name}</h3>
                            <p className="original-price">Original Price: <i>${deal.originalPrice}</i></p>
                            <p>Price: <i>${deal.discountedPrice}</i></p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                ))}
                
            </div>
            <div className="deals-routes">
                <Link className="deals-link" to="/bestdeals" element={<BestDeals />}>Best Deals</Link>
                
            </div>
        </div>
    );
}
function Wedding() {
    return (
        <div>

            <div className="specific-content-container">
                <div className="specific-content-container-content">
                    <div className="spacer-horizontal">
                        <div>
                            <h2>Wedding Jewelry</h2>
                            <p className="normal-container-description">Explore our stunning collection of wedding jewelry, 
                                including engagement rings, wedding bands, 
                                and bridal accessories that symbolize your eternal love.</p>
                        </div>
                        <Link to="/inventory" className="browse-link-inverted" >Browse our collection--</Link>

                    </div>
                    <img src={necklace} alt="necklace model *def copyright"/>
                </div>
            </div>
            <div className="specific-content-container">
                <div className="specific-content-container-content">
                    <img src={necklace} alt="necklace model *def copyright"/>
                    <div className="spacer-horizontal-inverted">
                        <div>
                            <h2>Necklaces</h2>
                            <p className="normal-container-description">Explore our stunning collection of necklaces, 
                                including pendant necklaces, chokers, and statement pieces that add elegance to any outfit.</p>
                        </div>
                        <Link to="/inventory" className="browse-link-inverted" >Browse our collection--</Link>
                    </div>
                </div>
            </div>
            <div className="specific-content-container">
                <div className="specific-content-container-content">
                    <div className="spacer-horizontal">
                        <div>
                            <h2>Bracelets</h2>
                            <p className="normal-container-description">Explore our stunning collection of wedding jewelry, 
                                including engagement rings, wedding bands, 
                                and bridal accessories that symbolize your eternal love.</p>
                        </div>
                        <Link to="/inventory" className="browse-link">Browse our collection--</Link>
                    </div>
                    <img src={necklace} alt="necklace model *def copyright"/>
                </div>
            </div>
            <div className="specific-content-container">
                <div className="specific-content-container-content">
                    <img src={necklace} alt="necklace model *def copyright"/>
                    <div className="spacer-horizontal-inverted">
                        <div>
                            <h2>Earrings</h2>
                            <p className="normal-container-description">Explore our stunning collection of necklaces, 
                                including pendant necklaces, chokers, and statement pieces that add elegance to any outfit.</p>
                        </div>
                        <Link to="/inventory" className="browse-link-inverted" >Browse our collection--</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
function Home() {
    const [IsOpen, setisOpen] = useState(false);

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
                        <img src={ring} alt="Random Ring" onClick={() => setisOpen(!IsOpen)}/>
                        <div className={`item-info ${IsOpen ? 'expanded' : ''}`}>
                            <h3>Ring Name</h3>
                            <p>Ring Description</p>
                            <p>Price: <i>$99.99</i></p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                    <div className="item-card">
                        <img src={ring} alt="Random Ring" onClick={() => setisOpen(!IsOpen)}/>
                        <div className={`item-info ${IsOpen ? 'expanded' : ''}`}>
                            <h3>Ring Name</h3>
                            <p>Ring Description</p>
                            <p>Price: <i>$99.99</i></p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                    <div className="item-card">
                        <img src={ring} alt="Random Ring" onClick={() => setisOpen(!IsOpen)}/>
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
                <div className="deals-container blank">
                    {showItemDetails()}
                </div>
                <div className="specific-container">
                    {Wedding()}
                </div>
                <div className="inverted-specific-container">
                    {/* {jewelry()} */}
                </div>
            </div>
            <p>Welcome to the Home page.</p>
        </div>
    );
}
// End of Home component
// This is just a simple homepage concept for a marketplace website.
export default Home;
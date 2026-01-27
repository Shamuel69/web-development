import React from "react";
import { Routes, Route, Link } from 'react-router-dom';

import './css/bestdeals.css';
import './css/home.css';

import ring from '../assets/randoring.jpg';
import necklace from '../assets/necklacemodel.jpg';

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
        name: "Necklace Name",
        originalPrice: 199.99,
        discountedPrice: 99.99,
        image: necklace
    },
    {
        id: 3,
        name: "Necklace Name",
        originalPrice: 199.99,
        discountedPrice: 99.99,
        image: necklace
    },
    {
        id: 4,
        name: "Ring Name",
        originalPrice: 199.99,
        discountedPrice: 99.99,
        image: ring
    },
]

const Topsales = () => {
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
        </div>
    )
}

function BestDeals() {
    return (
        <div>
            <h1>Best Deals Page</h1>
            <p>This is the Best Deals page.</p>
        </div>
    );
}
export { Topsales };
export default BestDeals;
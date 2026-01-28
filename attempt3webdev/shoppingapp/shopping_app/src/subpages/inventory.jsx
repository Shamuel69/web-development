import React, { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './css/inventory.css';
import ring from '../assets/randoring.jpg';
import necklace from '../assets/necklacemodel.jpg';
import BestDeals, { Topsales } from './bestdeals.jsx'
import arrowdown from '../assets/arrow-down.svg';


function Inventory() {
    return (
        <div>
            <h1>Marketplace</h1>
            <div>
                <h2 style={{fontWeight: 450}}>Hot Sellers:</h2>
                <Topsales />
            </div>
            <div> {/* sb stands for search bar */}
                <div className="sb-inventory">
                    <div className="sb-inventory-container">
                        <input className="sb-inventory-input" type="text" placeholder="Search for a specific item!"/>
                        <button className="sb-inventory-button" style={{backgroundColor: 'transparent'}}>Search</button> {/* this has no functionality yet lol */}
                    </div>
                    <button className="sb-inventory-type" style={{backgroundColor: 'transparent'}}>Type <img style={{fill: '#cacaca', width: '12px', height: '15px'}} src={arrowdown} alt="Arrow Down"/></button>
                </div>
                <div className="inventory-filter">
                    <div>
                        <h3 style={{fontWeight: 450}}>Filters:</h3>
                        <input className="inventory-filter-price-input" type="number" placeholder="Min Price"/>
                        <input className="inventory-filter-price-input" type="number" placeholder="Max Price"/>

                    </div>
                    <div className="inventory-filter-types">
                        <div className="inventory-filter-options">
                            <input type="checkbox" name="type" text="gold"/> Gold
                            <input type="checkbox" name="type" text="silver"/> Silver
                            <input type="checkbox" name="type" text="platinum"/> Platinum
                        </div>

                    </div>
                    <div className="inventory-filter-categories">
                        <button className="inventory-filter-option" style={{backgroundColor: 'transparent'}}>Rings</button>
                        <button className="inventory-filter-option" style={{backgroundColor: 'transparent'}}>Necklaces</button>
                        <button className="inventory-filter-option" style={{backgroundColor: 'transparent'}}>Earrings</button>
                        <button className="inventory-filter-option" style={{backgroundColor: 'transparent'}}>Bracelets</button>
                    </div>
                </div>
                <div className="inventory-display-area">
                    <div className="inventory-container">
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map((item) => (
                            <div className="item-card" key={item}>
                                <img src={ring} alt="Random Ring"/>
                                <div className="item-info">
                                    <h3>Ring Name</h3>
                                    <p>Ring Description</p>
                                    <p>Price: <i>$99.99</i></p>
                                    <button>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Inventory;
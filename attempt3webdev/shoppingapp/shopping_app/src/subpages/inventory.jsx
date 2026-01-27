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
            <div>
                <div className="search-bar-inventory">
                    <input className="search-bar-inventory-input" type="text" placeholder="Search for a specific item!"/>
                    <button className="search-bar-inventory-button" style={{backgroundColor: 'transparent'}}>Search</button> {/* this has no functionality yet lol */}
                    <button className="search-bar-inventory-type" style={{backgroundColor: 'transparent'}}>Type <img style={{fill: '#cacaca', width: '12px', height: '15px'}} src={arrowdown} alt="Arrow Down"/></button>
                </div>
            </div>
        </div>

    );
}

export default Inventory;
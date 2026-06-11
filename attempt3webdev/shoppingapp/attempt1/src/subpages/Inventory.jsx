import React, { useState, useEffect, useRef, useContext } from 'react'

import './css/inventory.css';

import { InventoryContext } from '../context/InventoryContext.jsx';

function FrontPageItems({inventory}) {
    const frontPageItems = inventory.filter(item => item.front_page === true);
    return (
        <div className="front-page">
            <h2>Front Page Items</h2>
            <div className="front-page-container">
                {frontPageItems.map(item => (
                    <div className="front-page-item" key={item.id}>
                        <img src={item.image} alt={item.label} />
                        <p>{item.label}</p>
                        <span>{item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
function GetQuick({inventory}) {
    const quickItems = inventory.filter(item => item.quantity <= 2 && item.quantity > 0);
    return (
        <div className="front-page">
            <h2>Quick Items</h2>
            <div className="front-page-container">
                {quickItems.map(item => (
                    <div className="front-page-item" key={item.id}>
                        <img src={item.image} alt={item.label} />
                        <p>{item.label}</p>
                        <span>{item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
function ForYou() {
    
}
function HotItems({inventory, vertical=false}) {
    const hotItems = inventory.sort((a, b) => (b.times_interacted || 0) - (a.times_interacted || 0)).slice(0, 5);
    

    if(vertical){
        return (
            <div className="front-page-vertical">
                <h2>Hot Items</h2>
                <div className="front-page-container-vertical">
                    {hotItems.map(item => (
                        <div className="front-page-item" key={item.id}>
                            <img src={item.image} alt={item.label} />
                            <p>{item.label}</p>
                            <span>{item.price}</span>

                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
            <div className="front-page">
                <h2>Hot Items</h2>
                <div className="front-page-container">
                    {hotItems.map(item => (
                        <div className="front-page-item" key={item.id}>
                            <img src={item.image} alt={item.label} />
                            <p>{item.label}</p>
                            <span>{item.price}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
}
function Inventory() {
    const { inventory, loading, error } = useContext(InventoryContext);

    return (
        <div className="inventory-container">
            
            {/* have this on the left */}
            <section id="sort"> 
                <h3>Sort: </h3>   
                <h4>Accessory: </h4>
                <ul>
                    <li>Necklace</li>
                    <li>Earrings</li>
                    <li>Bracelet</li>
                    <li>Ring</li>
                </ul>
                <h4>Price: </h4>
                <ul>
                    <li>Under $50</li>
                    <li>$50 - $100</li>
                    <li>$100 - $150</li>
                    <li>$150 - $200</li>
                    <li>Over $200</li>
                </ul>
                <h4>Rating: </h4>
                <ul>
                    <li>1 Star</li>
                    <li>2 Star</li>
                    <li>3 Star</li>
                    <li>4 Star</li>
                    <li>5 Star</li>
                </ul>
                <h4>Tags: </h4>
                <ul>
                    <li>Silver</li>
                    <li>Gold</li>
                    <li>Platinum</li>
                </ul>
            </section>
            {/* just the inventory so in the middle  */}
            <section id="inventory">
                <div className="inventory-stock-container">
                    {inventory.map(item => (
                        <div className="inventory-item" key={item.id}>
                            <img src={item.image} alt={item.label} />
                            <p>{item.label}</p>
                            <span>{item.rating}</span>
                            <span>{item.price}</span>
                        </div>
                    ))}
                </div>

            </section>
            {/* have this on the right */}
            <section id="hot-items">
                    <HotItems inventory={inventory} vertical={true} />
            </section>
        </div>
    )
}


export {Inventory, FrontPageItems, GetQuick, HotItems};
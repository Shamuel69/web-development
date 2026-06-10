import React, { useState, useEffect, useRef, useContext } from 'react'

import './css/inventory.css';

import { InventoryProvider } from '../context/InventoryContext.jsx';

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
    const { user } = useContext(AuthContext);
    const { inventory, loading, error } = useContext(InventoryContext);

    return (
        <div className="inventory-container">
        </div>
    )
}


export {Inventory, FrontPageItems, GetQuick, HotItems};
import React, { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';

import BestDeals, { Topsales } from './BestDeals.jsx'
import './css/inventory.css';

import ring from '../assets/randoring.jpg';
import necklace from '../assets/necklacemodel.jpg';
import arrowdown from '../assets/arrow-down.svg';

// const categories = [
//     {id:1, name: 'Rings', label: 'Rings' },
//     {id:2, name: 'Necklaces', label: 'Necklaces' },
//     {id:3, name: 'Earrings', label: 'Earrings' },
//     {id:4, name: 'Bracelets', label: 'Bracelets' },
// ]
const inventory = [
    {id:1, name: 'Ring', label: 'Ring', image: ring, description: 'A stunning ring with a brilliant cut diamond.', price: 250, tags: ['Gold', 'Diamond'] },
    {id:2, name: 'Necklace', label: 'Necklace', image: necklace, description: 'A beautiful necklace with a pendant design.', price: 100, tags: ['Silver', 'Ruby'] },
    {id:3, name: 'Earrings', label: 'Earrings', image: ring, description: 'A pair of elegant earrings with a timeless design.', price: 70, tags: ['Gold', 'Pearl'] },
    {id:4, name: 'Bracelets', label: 'Bracelets', image: necklace, description: 'A stylish bracelet made with high-quality materials.', price: 80, tags: ['Silver', 'Sapphire'] },
    {id:5, name: 'Necklace2', label: 'Necklace', image: necklace, description: 'A beautiful necklace with a pendant design.', price: 100, tags: ['Platinum', 'Diamond'] },
    {id:6, name: 'Earrings2', label: 'Earrings', image: ring, description: 'A pair of elegant earrings with a classic design.', price: 70, tags: ['Gold', 'Emerald'] },
    {id:7, name: 'Bracelets2', label: 'Bracelets', image: necklace, description: 'A trendy bracelet with a modern design.', price: 90, tags: ['Silver', 'Ruby'] },
    {id:8, name: 'Bracelets3', label: 'Bracelets', image: necklace, description: 'A stylish bracelet made with premium materials.', price: 80, tags: ['Gold', 'Sapphire'] },
    {id:9, name: 'Necklace3', label: 'Necklace', image: necklace, description: 'An elegant necklace made with high-quality materials.', price: 150, tags: ['Platinum', 'Emerald'] },
    {id:10, name: 'Ring4', label: 'Ring', image: ring, description: 'A stunning ring with a brilliant cut diamond.', price: 250, tags: ['Gold', 'Diamond'] },
    {id:11, name: 'Necklace4', label: 'Necklace', image: necklace, description: 'A beautiful necklace with intricate designs.', price: 120, tags: ['Silver', 'Ruby'] },
]
const materials = [
    {id:1, name: 'Gold', label: 'Gold' },
    {id:2, name: 'Silver', label: 'Silver' },
    {id:3, name: 'Platinum', label: 'Platinum' },
]
const decorations = [
    {id:1, name: 'Diamond', label: 'Diamond' },
    {id:2, name: 'Ruby', label: 'Ruby' },
    {id:3, name: 'Sapphire', label: 'Sapphire' },
    {id:4, name: 'Emerald', label: 'Emerald' },
    {id:5, name: 'Pearl', label: 'Pearl' },
]
// const [materialItems, setMaterialItems] = useState({});
// const [decorationItems, setDecorationItems] = useState({});



function Inventory() {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };
    const filteredInventory = inventory.filter((item) => {
        const materialMatch = Object.keys(checkedItems).filter((key) => checkedItems[key] && materials.some((material) => material.name === key)).length === 0 || item.tags.some((tag) => checkedItems[tag] && materials.some((material) => material.name === tag));
        const decorationMatch = Object.keys(checkedItems).filter((key) => checkedItems[key] && decorations.some((decoration) => decoration.name === key)).length === 0 || item.tags.some((tag) => checkedItems[tag] && decorations.some((decoration) => decoration.name === tag));
        return materialMatch && decorationMatch;
    });
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
                    <h4>Selected:</h4>
                    {Object.keys(checkedItems).filter((item) => checkedItems[item]).map((item) => (
                        <p key={item} className="selected-filters">{item}</p>
                    ))}
                </div>
                <div className="inventory-filter">
                    <div>
                        <h3 style={{fontWeight: 450}}>Filters:</h3>
                        <input className="inventory-filter-price-input" type="number" placeholder="Min Price"/>
                        <input className="inventory-filter-price-input" type="number" placeholder="Max Price"/>

                    </div>
                    <div className="inventory-filter-types">
                        <div className="inventory-filter-options">
                            {materials.map((material) => (
                                <div className="inventory-filter-category" key={material.id}>
                                    <input type="checkbox" name={material.name} text={material.label} onChange={handleCheckboxChange}/> {material.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="inventory-filter-types">
                        <div className="inventory-filter-options">
                            {decorations.map((decoration) => (
                                <div className="inventory-filter-category" key={decoration.id}>
                                    <input type="checkbox" name={decoration.name} text={decoration.label} onChange={handleCheckboxChange}/> {decoration.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="inventory-filter-categories">
                        <button className="inventory-filter-option" style={{backgroundColor: 'transparent'}} onClick={handleCheckboxChange}>Rings</button>
                        <button className="inventory-filter-option" style={{backgroundColor: 'transparent'}} onClick={handleCheckboxChange}>Necklaces</button>
                        <button className="inventory-filter-option" style={{backgroundColor: 'transparent'}} onClick={handleCheckboxChange}>Earrings</button>
                        <button className="inventory-filter-option" style={{backgroundColor: 'transparent'}} onClick={handleCheckboxChange}>Bracelets</button>
                    </div>
                </div>
                <div className="inventory-display-area">
                    <div className="inventory-container">
                        {filteredInventory.map((item) => (
                            <div className="item-card" key={item.id}>
                                <img src={item.image} alt={item.name}/>
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Price: <i>${item.price}</i></p>
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
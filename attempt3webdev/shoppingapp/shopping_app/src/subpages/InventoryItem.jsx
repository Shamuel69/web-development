import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";

import './css/inventory.css'
import './css/inventoryitem.css'

import ring from '../assets/randoring.jpg'
import necklace from '../assets/necklacemodel.jpg'
import earrings from '../assets/earring.jpg'
import bracelets from '../assets/bracelet.jpg'

function InventoryItem({ item }) {
    return (
        <div className="item-card">
            <img src={item.image} alt="Random Ring"/>
            <div className="item-info">
                <h3>{item.name}</h3>
                <p>Original Price: <i>${item.originalPrice}</i></p>
                <p>Price: <i>${item.discountedPrice}</i></p>
                <button>Add to Cart</button>
            </div>
        </div>
    )
}


export default InventoryItem;
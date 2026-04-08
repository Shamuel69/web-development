import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import './css/inventory.css'
import './css/inventoryitem.css'

import ring from '../assets/randoring.jpg'
import necklace from '../assets/necklacemodel.jpg'
import earrings from '../assets/earring.jpg'
import bracelets from '../assets/bracelet.jpg'


function InventoryItem() {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const images = {
        "Ring": ring,
        "Necklace": necklace,
        "Earrings": earrings,
        "Bracelets": bracelets
    };

    useEffect(() => {
        const fetchedItem = async () => {
            try {
                const res = await fetch(`http://localhost:8080/inventory/${id}`);
                // if (!res.ok) throw new Error("Item not found" + id);
                const data = await res.json();
                setItem(data.item);
            } catch (error) {
                console.error("Error fetching item:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchedItem();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="item-card">
            <img src={images[item.label]} alt="Random Ring"/>
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
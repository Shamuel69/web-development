import React, { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

// import './css/inventory.css'
import './css/inventoryitem.css'

import ring from '../assets/randoring.jpg'
import necklace from '../assets/necklacemodel.jpg'
import earrings from '../assets/earring.jpg'
import bracelets from '../assets/bracelet.jpg'


function InventoryItem() {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const discountedPrice = item ? item.price - item.price * item.discountRate : 0;

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
                if (!res.ok) throw new Error("Item not found" + id);
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
        <div className="root">
            <div className="inventory-item">
                <img src={images[item.label]} alt={item.name}/>
                <div className="item-info">
                    <h3>{item.name}</h3>
                    <div className="item-info-container">
                        {!discountedPrice ? 
                            (
                                <div className="price">
                                    <p>Price: ${item.price}</p>
                                </div>
                            ) : (
                                <div className="price">
                                    <p className="original-price">Original Price: ${item.price} ${item.discountRate * 100}% off</p>
                                    <p className="discounted-price">Discounted Price: ${discountedPrice}</p>
                                </div>
                            )
                        }
                        <div className="tags">
                            <div className="materials">
                                <h4 className="label">Materials:</h4>
                                <div className="tags-container">
                                    {item.tags && item.tags.map((tag) => (
                                        <Link key={tag} to={`/inventory?filter=${tag}`}>
                                            <span className="tag-link" >{tag}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <p className="description">{item.description}</p>
                        
                    </div>
                    <button className="add-to-cart">Add to Cart</button>

                </div>
                
            </div>
        </div>
    )
}


export default InventoryItem;
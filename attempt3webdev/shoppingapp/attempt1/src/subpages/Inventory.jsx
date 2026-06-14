import React, { useState, useEffect, useRef, useContext } from 'react'
import useNavigate from 'react-router-dom';
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
                        <div className="inventory-item-info">
                            <span>${item.price}</span>
                            <span>{item.averageRating}</span>
                        </div>
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
                        <div className="inventory-item-info">
                            <span>${item.price}</span>
                            <span>{item.averageRating}</span>
                        </div>
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
                            <div className="inventory-item-info">
                                <span>${item.price}</span>
                                <span>{item.averageRating}</span>
                            </div>

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
                            <div className="inventory-item-info">
                                <span>${item.price}</span>
                                <span>{item.averageRating}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
}
function Inventory() {
    const { inventory, loading, error } = useContext(InventoryContext);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        accessory: [],
        price: [],
        rating: [],
        tags: [],
    });

    const filteredInventory = inventory.filter(item => {
        const filtered_items = [];
        if (filters.accessory.length === 0 || item.label.includes(filters.accessory.map(itemtoCheck => itemtoCheck.toLowerCase()))){
            filtered_items.push(item);
            console.log(filtered_items);
        }
        if (filters.price.length === 0 || item.price.includes(filters.price)){
            console.log(item, item.price, filters.price);
        }
        
        
        
        // return (
        //     filters.accessory.length === 0 || item.label.includes(item.accessory) &&
        //     filters.price.length === 0 || item.price.includes(item.price) &&
        //     filters.rating.length === 0 || filters.rating.includes(item.rating) &&
        //     filters.tags.length === 0 || item.tags.some(tag => filters.tags.includes(tag))
        // );
    })

    const priceRanges = (value) => {
        const numbers = value.match(/\d+/g);
        console.log(parseInt(numbers));
        if (value.includes("Under")) {
            setFilters(prevFilters => ({
                ...prevFilters,
                price: prevFilters.price.filter(item => item <= parseInt(numbers)),
            }))
        }else if (value.includes("Over")) {
            setFilters(prevFilters => ({
                ...prevFilters,
                price: prevFilters.price.filter(item => item >= parseInt(numbers)),
            }))
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                price: prevFilters.price.filter(item => item === parseInt(numbers)),
            }))
        }
    } 
    const handleCheckboxChange = (category, value) => {
        const lowercaseCategory = category.toLowerCase();
        if (lowercaseCategory === "rating") {
            setFilters(prevFilters => ({
                ...prevFilters,
                [lowercaseCategory]: prevFilters[lowercaseCategory].includes(value) 
                ? prevFilters[lowercaseCategory].filter(item => item >= parseInt(value)) 
                : [...prevFilters[lowercaseCategory], parseInt(value)],
            }))
            console.log(filters);
            console.log(filteredInventory);

            return;
        }
        if (lowercaseCategory === "price") {
            priceRanges(value);
            console.log(filters);
            console.log(filteredInventory);            
            return;
        }
        setFilters(prevFilters => ({
            ...prevFilters,
            [lowercaseCategory]: prevFilters[lowercaseCategory].includes(value) 
            ? prevFilters[lowercaseCategory].filter(item => item !== value) 
            : [...prevFilters[lowercaseCategory], value],
        }))
        console.log(filteredInventory);
    }

    const accessory = ["Necklace", "Earrings", "Bracelet", "Ring"];
    const price = ["Under $50", "$50 - $100", "$100 - $150", "$150 - $200", "Over $200"];
    const rating = ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"];
    const tags = ["Silver", "Gold", "Platinum", "Sapphire", "Black Steel", "Rose Gold", "Emerald"];

    return (
        <div className="inventory-container">
            
            {/* have this on the left */}
            <section id="sort"> 
                <h3>Sort: </h3>   
                <h4>Accessory: </h4>
                    <ul>
                        {accessory.map(item => (
                            <li key={item}>
                                <input type="checkbox" checked={filters.accessory.includes(item)} onChange={() => handleCheckboxChange("accessory", item)} />
                                <label htmlFor={`accessory-${item}`}>{item}</label>
                            </li>
                        ))}
                    </ul>
                <h4>Price: </h4>
                <ul>
                    {price.map(item => (
                        <li key={item}>
                            <input type="checkbox" checked={filters.price.includes(item)} onChange={() => handleCheckboxChange("price", item)} />
                            <label htmlFor={`price-${item}`}>{item}</label>
                        </li>
                    ))}
                </ul>
                <h4>Rating: </h4>
                <ul>
                    {rating.map(item => (
                        <li key={item}>
                            <input type="checkbox" checked={filters.rating.includes(item)} onChange={() => handleCheckboxChange("rating", item)} />
                            <label htmlFor={`rating-${item}`}>{item}</label>
                        </li>
                    ))}
                </ul>
                <h4>Tags: </h4>
                <ul>
                    {tags.map(item => (
                        <li key={item}>
                            <input type="checkbox" checked={filters.tags.includes(item)} onChange={() => handleCheckboxChange("tags", item)} />
                            <label htmlFor={`tags-${item}`}>{item}</label>
                        </li>
                    ))}
                </ul>
            </section>
            {/* just the inventory so in the middle  */}
            <section id="inventory">
                <div className="inventory-stock-container">
                    {inventory.map(item => (
                        <div className="inventory-item" key={item.id} onClick={() => navigate(`/shop/${item.id}`)}>
                            <img src={item.image} alt={item.label} />
                            <p>{item.tags[0]} and {item.tags[1]} {item.label}</p>
                            <div className="inventory-item-info">
                                <span>${item.price}</span>
                                <span>{item.averageRating}</span>
                            </div>
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
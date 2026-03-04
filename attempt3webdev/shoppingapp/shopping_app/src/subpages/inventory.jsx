import React, { useState, useContext, useEffect} from "react";

import BestDeals, { Topsales } from './BestDeals.jsx'
import { CartContext } from '../context/CartContext.jsx';
import './css/inventory.css';

import ring from '../assets/randoring.jpg';
import necklace from '../assets/necklacemodel.jpg';
import earrings from '../assets/earring.jpg';
import bracelets from '../assets/bracelet.jpg';
import arrowdown from '../assets/arrow-down.svg';
import cart from '../assets/shopping-cart.svg';


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



function Inventory() {
    const [checkedItems, setCheckedItems] = useState({});
    // const { addToCart } = useContext(CartContext);
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filteredInventory, setFilteredInventory] = useState([]);

    useEffect(() => {
        const fetchInventory = async() => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch("http://localhost:8080/inventory");
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Received inventory:", data.inventory);
                setInventory(data.inventory);
            } catch (err) {
                console.error("Error fetching inventory:", err);
                setError("Failed to load inventory. error: " + err.message);
            } finally {
                console.log("Fetch inventory attempt completed.");
                setLoading(false);
            };
        };
        
        fetchInventory();
    }, []);

    const itemLabels = {
        'Ring': ring,
        'Necklace': necklace,
        'Earrings': earrings,
        'Bracelets': bracelets
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
        const crimpedInventory = Array.isArray(inventory) ? inventory.filter((item) => {
            const materialMatch = !Object.keys(checkedItems).some((key) => checkedItems[key] && materials.some((material) => material.name === key));
            const decorationMatch = !Object.keys(checkedItems).some((key) => checkedItems[key] && decorations.some((decoration) => decoration.name === key));
            return materialMatch && decorationMatch;
        }) : [];
        console.log("Current crimped inventory state:", filteredInventory);
        setFilteredInventory(crimpedInventory);
    };


    // const handleAddToCart = (item) => {
    //     addToCart(item);
    //     alert(`${item.name} added to cart!`)
    // };
    // const filteredInventory = Array.isArray(inventory) ? inventory.filter((item) => {
    //     const materialMatch = !Object.keys(checkedItems).some((key) => checkedItems[key] && materials.some((material) => material.name === key));
    //     const decorationMatch = !Object.keys(checkedItems).some((key) => checkedItems[key] && decorations.some((decoration) => decoration.name === key));
    //     return materialMatch && decorationMatch;
    // }) : [];


    console.log("Current inventory state:", inventory);
    console.log("Current filtered inventory state:", filteredInventory);


    if (loading) {
        return <div style={{ color: '#cecece', textAlign: 'center', padding: '2em' }}>Loading inventory...</div>;
    }

    if (error) {
        return <div style={{ color: '#ff6b6b', textAlign: 'center', padding: '2em' }}>❌ {error}</div>;
    }

    if (!Array.isArray(inventory) || inventory.length === 0) {
        return <div style={{ color: '#cecece', textAlign: 'center', padding: '2em' }}>No items found</div>;
    }

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
                                    <input type="checkbox" name={material.name} onChange={handleCheckboxChange} checked={checkedItems[material.name] || false}/> {material.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="inventory-filter-types">
                        <div className="inventory-filter-options">
                            {decorations.map((decoration) => (
                                <div className="inventory-filter-category" key={decoration.id}>
                                    <input type="checkbox" name={decoration.name} onChange={handleCheckboxChange} checked={checkedItems[decoration.name] || false}/> {decoration.label}
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
                                <img src={itemLabels[item.label]} alt={item.name}/>
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.description || "No description."}</p>
                                    <p>Price: <i>${item.price}</i></p>
                                    {/* <button onClick={() => handleAddToCart(item)}>Add to Cart</button> */}
                                </div>
                            </div>
                        ))}

                        {/* {filteredInventory.map((item) => (
                            <div className="item-card" key={item.id}>
                                <img src={item.image} alt={item.name}/>
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Price: <i>${item.price}</i></p>
                                    <button>Add to Cart</button>
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Inventory;
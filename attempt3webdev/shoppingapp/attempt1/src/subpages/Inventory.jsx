import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './css/inventory.css';
import { CartContext } from '../context/CartContext.jsx';
import { InventoryContext } from '../context/InventoryContext.jsx';
import { CollectionsContext } from '../context/CollectionsContext.jsx';

function FrontPageItems({inventory}) {
    const frontPageItems = inventory.filter(item => item.front_page === true);
    return (
        <div className="front-page">
            <h2>Front Page Items</h2>
            <div className="front-page-container">
                {frontPageItems.map(item => (
                    <Link to={`/shop/${item.id}`}>
                        <div className="front-page-item" key={item.id}>
                            <img src={item.image} alt={item.label} />
                            <p>{item.label}</p>
                            <div className="inventory-item-info">
                                <span>${item.price}</span>
                                <span>{item.averageRating}</span>
                            </div>
                        </div>
                    </Link>
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
                    <Link to={`/shop/${item.id}`}>
                        <div className="front-page-item" key={item.id}>
                            <img src={item.image} alt={item.label} />
                            <p>{item.label}</p>
                            <div className="inventory-item-info">
                                <span>${item.price}</span>
                                <span>{item.averageRating}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
function ForYou() {
    
}
function CollectionPopup( {user, item, active} ) {
    const [collections, setCollections] = useState([]);
    const {buttonClickHandler, updateCollection} = useContext(CollectionsContext);
    useEffect(() => {

        const createCollection = async () => {
            try{
                buttonClickHandler(item);
            }catch (error) {
                console.error("Error creating collection:", error);
            }
        }
        if (collections === "create a collection") {
            createCollection();
        } else {
            updateCollection(collections);
        }
    }, [collections]);
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await fetch(`http://localhost:8080/collections/${user.id}`)
                if (!res.ok) throw new Error("Collections not found");
                const data = await res.json();
                setCollections(data.collections);
            } catch (error) {
                setCollections([]);
            }
        }
        fetchCollections();
    }, [user]);
    return (
        <>
            <div className={`collection-popup-container ${active ? "active" : ""}`} onClick={() => active(false)} >
                    <div className="collection-popup" onClick={(e) => e.stopPropagation()}>
                        {collections.length > 0 ? (
                            <div className="collection-popup-container">
                                <h2>My Collections</h2>
                                <ul>
                                    {collections.map(collection => (
                                        <li key={collection.id}>
                                            <img src={collection.image || null} alt={collection.name} />
                                            <label>{collection.name}</label>
                                            <label className="collection-item-count">{collection.items.length}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="collection-popup-container">
                                <h2>No Collections</h2>
                                <button>Create a Collection</button>
                            </div>
                        )}
                            
                    </div>
                </div>
        </>
    )
}

function InventoryItem() {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [collection, setCollection] = useState(false);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const {addToCart} = useContext(CartContext);
    const {addToRecent} = useContext(InventoryContext);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`http://localhost:8080/inventory/${id}`)
                if (!res.ok) throw new Error("Item not found");
                const data = await res.json();
                setItem(data.item);
                console.log(item);
                addToRecent(item);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching item:", error);
                setLoading(false);
            }
        }
        fetchItem();
    }, [id]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                addToRecent(item, true);
            } catch (error) {
                console.error("Error fetching item:", error);
            }finally{
                setFavorite(false);
            }
        }
        fetchWishlist();
    }, [favorite])

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <>
            <div className="inventory-item-page">
                {(user) ? (
                    <>  
                        <div className="inventory-item-page-image">
                            <img src={item.image} alt={item.label} />
                        </div>
                        <div className="inventory-item-page-container">
                            <h4>{item.label} - {item.tags[0]} and {item.tags[1]}</h4>
                            <h2>{item.tags[0]} and {item.tags[1]} {item.label}</h2>
                            <p>{item.description}</p>
                            <div className="inventory-item-page-quantity">
                                <label className="price">${item.price}</label>
                                <div className="quantity-container">
                                    <label htmlFor="quantity">Quantity: </label>
                                    <div className='arrow-buttons'>
                                        <button className="add-button" onClick={() => document.getElementById("quantity").stepUp()}>+</button>
                                        <input type="number" id="quantity" name="quantity" placeholder="1" min="1" max={item.quantity} />
                                        <button className="subtract-button" onClick={() => document.getElementById("quantity").stepDown()}>-</button>
                                    </div>
                                </ div>
                            </div>
                                
                            <label><span className="star">&#9733;</span> {item.averageRating}</label>
                            <div className="inventory-item-info-page">
                                <div className="inventory-item-page-buttons">
                                    <button onClick={() => addToCart(item)} className="cart-button">Add to Cart</button>
                                    <button onClick={() => setFavorite(true)} className="wishlist-button">Add to Wishlist</button>
                                </div>
                                <button onClick={() => setCollection(true)} className="collection-button">Add to Collection</button>
                                <button onClick={() => addToCart(item)} className="buy-button">Buy Now</button>
                            </div>
                        </div>
                        <CollectionPopup user={user} item={item} active={collection} />
                        
                    </>
                ):(
                    <>
                        <img src={item.image} alt={item.label} />
                        <p>{item.label}</p>
                        <div className="inventory-item-info">
                            <span>{item.averageRating}</span>
                            <span>${item.price}</span>
                        </div>
                        <button onClick={() => setFavorite(true)}>Add to Wishlist</button>
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </>
                )}
            </div>
        </>
    )
}
function HotItems({inventory, vertical=false}) {
    const hotItems = inventory.sort((a, b) => (b.times_interacted || 0) - (a.times_interacted || 0)).slice(0, 5);
    if(vertical){
        return (
            <div className="front-page-vertical">
                <h2>Hot Items</h2>
                <div className="front-page-container-vertical">
                    {hotItems.map(item => (
                        <Link to={`/shop/${item.id}`} key={item.id}>
                            <div className="front-page-item" >
                            <img src={item.image} alt={item.label} />
                            <p>{item.label}</p>
                            <div className="inventory-item-info">
                                <span>${item.price}</span>
                                <span>{item.averageRating}</span>
                            </div>
                        </div>
                    </Link>
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
                        <Link to={`/shop/${item.id}`}>
                            <div className="front-page-item" key={item.id}>
                                <img src={item.image} alt={item.label} />
                                <p>{item.label}</p>
                                <div className="inventory-item-info">
                                    <span>${item.price}</span>
                                    <span>{item.averageRating}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
}



function Inventory() {
    const { inventory } = useContext(InventoryContext);
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
                        <Link to={`/shop/${item.id}`} key={item.id}>
                        
                            <div className="inventory-item" key={item.id} >
                                <img src={item.image} alt={item.label} />
                                <p>{item.tags[0]} and {item.tags[1]} {item.label}</p>
                                <div className="inventory-item-info">
                                    <span>${item.price}</span>
                                    <span>{item.averageRating}</span>
                                </div>
                            </div>
                        </Link>
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


export {Inventory, FrontPageItems, GetQuick, HotItems, InventoryItem};
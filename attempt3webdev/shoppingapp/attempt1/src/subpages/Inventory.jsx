import React, { useState, useContext, useEffect } from 'react'
import { Link,  useParams } from 'react-router-dom';
import './css/inventory.css';

import { CartContext } from '../context/CartContext.jsx';
import { InventoryContext } from '../context/InventoryContext.jsx';
import { CollectionsContext } from '../context/CollectionsContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx'
function FrontPageItems({inventory}) {
    const frontPageItems = inventory.filter(item => item.front_page === true);
    return (
        <>
            <div className='w-[90%] mx-auto mb-2 border-b-2 border-(--border) p-3 '>
                <h2 className='text-(--text-primary) text-[22px]'>Quick Items</h2>
            
            </div>
            <div className="front-page-container">
                {frontPageItems.map(item => (
                    <Link to={`/shop/${item.id}`} >
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
        </>
    )
}
function GetQuick({inventory}) {
    const quickItems = inventory.filter(item => item.quantity <= 2 && item.quantity > 0);
    return (
        <>
            <div className='w-[90%] mx-auto mb-2 border-b-2 border-(--border) p-3 md:flex-row gap-8'>
                <h2 className='text-(--text-primary) text-[22px]'>Quick Items</h2>
                <h4 className='text-(--text-muted)'>Running low on these items, get them so you do not miss out!</h4>
            </div>

            <div className="w-[90%] mx-auto flex flex-col md:flex-row  p-2.5 gap-3 md:gap-8 overflow-x-auto items-center snap-x text-(--text-primary) " style={{WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 0%, black 95%, transparent 100%)'}}>
                {quickItems.map(item => (
                    <Link to={`/shop/${item.id}`} className="mx-auto">
                        <div className="front-page-item " key={item.id}>
                            <img src={item.image} alt={item.label} className='w-full h-full object-cover rounded-[5px] '/>
                            <p>{item.label}</p>
                            <div className="inventory-item-info">
                                <span>${item.price}</span>
                                <span>{item.averageRating}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
    {/* // <div className="front-page"> */}
}
function RecentViewed({collection=false}) {
    const {showRecentViewed} = useContext(InventoryContext);
    const {profiles} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [recentData, setRecentData] = useState([]);
    const [nameofCreator, setNameofCreator] = useState([]);
    const recentlyViewed = JSON.parse(localStorage.getItem("recently-viewed")) 



    useEffect(() => {
        const fixData = async() => {
            setRecentData(collection ?  recentlyViewed.collections : recentlyViewed.items) 
            setLoading(false)

        }
        fixData()
    }, [collection, profiles])
    
    return (
        <div className="mt-12">
        {loading ? (
            <>
            </>
        ):(
            <>
            {/* <h1 className="text-red-600">{recentData.name}</h1> */}
                {collection ? (
                    
                        <>  
                            <div className='w-[90%] mx-auto mb-5 border-b-2 border-(--border) p-3'>
                                <h2 className='text-(--text-primary) text-[22px]'>Recently Viewed Collections:</h2>
                                <h4 className='text-(--text-muted)'>Here to show you your recently viewed collections</h4>
                            </div>
                            <div className=" flex flex-col md:flex-row gap-4 mx-auto w-[90%]   text-(--text-primary) 
                                            overflow-x-auto items-center snap-x h-fit md:h-[90px]" >
                                {recentlyViewed.collections.map(item => (
                                    <Link to={`/collections/${item.id}`} key={item.id}>
                                        <div id={item.id} key={item.id} className=" w-[280px] h-[80px] snap-start flex flex-row 
                                        border-2 border-(--bg-secondary) rounded-lg hover:scale-[1.05] duration-200">
                                        
                                            <img src={item.image} alt={item.name} className="object-cover h-[100%]"/>
                                            <div className='flex flex-col p-2'>
                                                <label className='w-full text-[20px] '>{item.name}</label>
                                                <div className="flex flex-row">
                                                    <h5>{(item.user)}</h5>
                                                    <h5>{item.rating}</h5>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>


                ) : (
                    
                    <>
                            <div className='w-[90%] mx-auto mb-5 border-b-2 border-(--border) p-3'>
                                <h2 className='text-(--text-primary) text-[22px] '>Recently Viewed Items:</h2>
                                <h4 className='text-(--text-muted) '>Here to show you your recently viewed items</h4>
                            </div>
                            {/* style={{maskImage: 'linear-gradient(to right, transparent 0%,  black 10%, black 90%, transparent 100%)'}} */}
                            <div className=" flex flex-col md:flex-row gap-4 mx-auto w-[90%] h-fit md:h-[220px] overflow-x-auto items-center snap-x text-(--text-primary) p-1" style={{WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 0%, black 95%, transparent 100%)'}}>
                            {recentlyViewed.items.map(item => (
                                    <Link to={`/shop/${item.id}`} key={item.id}>
                                        <div id={item.id} key={item.id} className=" w-[220px] h-[180px] snap-center flex flex-col border-2 border-(--bg-secondary) rounded-[8px] hover:scale-[1.05] duration-200">
                                            <img src={item.image} alt={item.name} className="object-cover h-[120px] " style={{borderradius: '8px 0 8px 0',}}/>
                                            <p className='text-[18px] w-[95%] mx-auto'>{item.name}</p>
                                            <div className="flex flex-row w-[95%] mx-auto justify-between text-(--text-secondary)">
                                                <h5>${item.price}</h5>
                                                
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                            </div>
                        </>
                )}
            </>
        )}

        </div>
    )

}
function ForYou() {
    
}

function HeroBanner() {
    const user = localStorage.getItem("user");
    
    return(
        <>
            {user ? (
                <>
                    <div className="bg-(--bg-primary) shadow-lg  overflow-hidden relative min-h-[340px] w-full  mt-18 md:w-[90%] mx-auto rounded-2xl ">
                    <div className="w-[90%] h-[340px] mx-auto ">
                        <div className="w-[80%] z-10 text-(--text-primary) mt-1 md:flex flex-col gap-4" >
                            <h1 class="text-[1.35rem] font-extrabold md:text-5xl">Style, post, and share!</h1>
                            <p className="text-[1.05rem] ml-4  md:text-2xl">Show off your style with our wide selection of items!</p>
                            <h4 className="text-lg font-bold md:text-3xl">Not sure what to get?</h4>
                            <p className="text-[1.05rem] ml-4 md:text-lg">Browse collections to find the perfect item for you!</p>

                        </div>
                        <div className="flex flex-row gap-4 z-20 bg-(--bg-secondary) absolute md: bottom-20 left-10">
                            <Link to="/collections" className="p-1 border-2 transition duration-200 hover:shadow-lg shadow-(--accent) ">Browse Collections</Link>
                            <Link to="/shop" className="p-1 border-2 transition duration-200 hover:shadow-lg shadow-(--accent) ">Shop Now</Link>
                        </div>
                        <div className="w-[50%] h-[100%] absolute z-0 right-0 top-0 md:w-[30%] " style={{webkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)'}}>
                            <img src="http://localhost:8080/watch5.png" alt="hero banner" className="w-[100%] h-[100%] object-cover z-0"/>
                        </div>
                    </div>
                    </div>
                </>
                ):(
                <></>

                )
            }
        </>
    )
}
function CollectionPopup( {user, item, active, setActive} ) {
    const [userCollections, setUserCollections] = useState([]);
    const {buttonClickHandler, collections} = useContext(CollectionsContext);
    const [collectionName, setCollectionName] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);
    

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                // this can be heavily improved if i accessed this through localstorage instead,
                // this will do though for now. Next website please draw this out in a better way
                const res = await fetch(`http://localhost:8080/profiles/${user.id}`);
                if (!res.ok) throw new Error("Collections not found");
                const data = await res.json();
                const thingy = data.user.collections;
                const b = thingy.map(collection => collections.filter(item => item.id === collection));
                const a = collections.filter(collection => collection.user_id === user.id);
                setUserCollections(a);
                console.log(b[0], a);
            } catch (err) {
                console.error("Error fetching collections:", err);
            }
        }
        fetchCollections();
        console.log(active, userCollections);
    }, [user]);

    const handleCreateCollection = () => {
        setButtonClicked(false);
        setActive(false);
    };
    return (
        <>
            <div className={`collection-popup-background ${active ? "active" : ""}`} onClick={() => setActive(false) && console.log( "mi illamo greg", collections) && setButtonClicked(false)} >
                    <div className={`collection-popup`} onClick={(e) => e.stopPropagation()}>
                        {userCollections && userCollections.length > 0 && !buttonClicked ? (
                            
                            <div className={`collection-popup-container`}>
                                <h2>My Collections</h2>
                                <ul>
                                    {userCollections.map(collection => (
                                        <li key={collection.id} className="collection-item-container" onClick={() => buttonClickHandler(item, collection) && setActive(false)}>
                                            <img src={collection.image || null} alt={collection.name} />
                                            <label>{collection.name}</label>
                                            <label className="collection-item-count">{collection.items.length}</label>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => setButtonClicked(true)} className="container-button">New Collection+</button>
                            </div>
                        ) : (
                            <div className={`collection-popup-container`}>
                                {buttonClicked ? (
                                    <div>
                                        <div className="collection-popup-title">
                                            <h2>Create a Collection</h2>
                                            <button onClick={() => setButtonClicked(false)}>Cancel</button>
                                        </div>
                                        <div className="collection-popup-input">
                                            <input type="text" placeholder="Collection Name" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} />
                                        </div>
                                        <button onClick={() => buttonClickHandler(item, { name: collectionName }) && handleCreateCollection()}>Create</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="collection-popup-title">
                                            <h2>My Collections</h2>
                                        </div>
                                        <button onClick={() => setButtonClicked(true)}>Create a Collection</button>
                                    </>
                                )}
                                
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
    const user = JSON.parse(localStorage.getItem('user')) || null;

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`http://localhost:8080/inventory/${id}`)
                if (!res.ok) throw new Error("Item not found");
                const data = await res.json();
                setItem(data.item);
                const item_data = {
                    id: data.item.id,
                    name: data.item.name,
                    price: data.item.price,
                    image: data.item.image,
                }
                addToRecent(item_data, false, "item");
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
                                        <input type="number" id="quantity" name="quantity" placeholder="1" min="1" max={item.quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}/>
                                        <button className="subtract-button" onClick={() => document.getElementById("quantity").stepDown()}>-</button>
                                    </div>
                                </ div>
                            </div>
                                
                            <label><span className="star">&#9733;</span> {item.averageRating}</label>
                            <div className="inventory-item-info-page">
                                <div className="inventory-item-page-buttons">
                                    <button onClick={() => addToCart(item, quantity)} className="cart-button">Add to Cart</button>
                                    <button onClick={() => setFavorite(true)} className="wishlist-button">Add to Wishlist</button>
                                </div>
                                <button onClick={() => setCollection(prevState => !prevState)} className="collection-button">Add to Collection</button>
                                <button onClick={() => addToCart(item, quantity)} className="buy-button">Buy Now</button>
                            </div>
                        </div>
                        <CollectionPopup user={user} item={item} active={collection} setActive={setCollection} />
                        
                    </>
                ):(
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
                                        <input type="number" id="quantity" name="quantity" placeholder="1" min="1" max={item.quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}/>
                                        <button className="subtract-button" onClick={() => document.getElementById("quantity").stepDown()}>-</button>
                                    </div>
                                </ div>
                            </div>
                                
                            <label><span className="star">&#9733;</span> {item.averageRating}</label>
                            <div className="inventory-item-info-page">
                                <div className="inventory-item-page-buttons">
                                    <button onClick={() => addToCart(item, quantity)} className="cart-button">Add to Cart</button>
                                    <button onClick={() => setFavorite(true)} className="wishlist-button">Add to Wishlist</button>
                                </div>
                                <button onClick={() => setCollection(prevState => !prevState)} className="collection-button">Add to Collection</button>
                                <button onClick={() => addToCart(item, quantity)} className="buy-button">Buy Now</button>
                            </div>
                        </div>
                        <CollectionPopup user={user} item={item} active={collection} setActive={setCollection} />
                        
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
            <div className='hidden md:flex'>

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
            </div>
        );
    }
    return (
            <>
                <div className='w-[90%]  mx-auto mb-5 border-b-2 border-(--border) p-3'>
                                    <h2 className='text-(--text-primary) text-[22px] '>Hot Items</h2>
                                    <h4 className='text-(--text-muted) '>Items that are selling FAST!</h4>
                                </div>
                <div className="w-[90%] mx-auto flex flex-col md:flex-row  p-2 gap-3 md:gap-8 overflow-x-auto items-center snap-x text-(--text-primary) " style={{WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 0%, black 95%, transparent 100%)'}}>
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
            </>
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
            
            <section  className="*:hidden md:flex flex-col w-[250px] h-[100%] p-2 gap-4 items-center border-r-2 border-(--border)"> 
                <div className="hidden md:flex flex-col">
                    
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
                </div>
            </section>

            <section id="inventory">
                <div className="flex flex-col md:flex-row w-[100%] justify-center h-fit flex-wrap 
                items-center text-(--text-primary)" 
                style={{WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 0%, black 95%, transparent 100%)'}}>
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
            <section id="hot-items">
                    <HotItems inventory={inventory} vertical={true} />
            </section>
        </div>
    )
}


export {Inventory, GetQuick, HotItems, HeroBanner, InventoryItem, RecentViewed};
import React, { useState, useEffect, useRef, useContext } from 'react'

import './css/collections.css';

import { CollectionsContext } from '../context/CollectionsContext.jsx';

import { AuthContext } from '../context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { InventoryProvider } from '../context/InventoryContext.jsx';
function RecentlymadeCollections() {
    const {collections, updateCollection} = useContext(CollectionsContext);
    useEffect(() => {
        
    })
}
function LookingatCollection() {
    const { id } = useParams();
    const { collections, updateCollection } = useContext(CollectionsContext);
    const collection = collections.find(c => c.id === id);
    const [owner, setOwner] = useState(null);
    const [editing, setEditing] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const recentlyViewed = JSON.parse(localStorage.getItem("recently-viewed")) 
    useEffect(() => {
        const fetchOwner = async () => {
            if (collection) {
                try {
                    if (collection.user_id === user.id) {
                        setOwner(true);
                    }
                    else {
                        setOwner(false);
                    }
                } catch (error) {
                    console.error('Error fetching owner:', error);
                    setOwner(false);
                } finally{
                    let parselist = {
                        image: collection.image,
                        rating: collection.rating,
                        name: collection.name,
                        id: collection.id,
                        user: collection.user_id
                        
                    }
                    localStorage.setItem("recently-viewed", [ ...recentlyViewed, JSON.stringify(parselist)])
                }
            }
        };
        fetchOwner();

    }, [collection]);

    useEffect(() => {
        console.log("LookingatCollection: id ", id);
        console.log("LookingatCollection: collection", collection);
    }, [id]);

    return (
        <div className="collection">
            
            <div className="collection-header">
                <h2>{collection.name}</h2>
                {owner && (
                    <button onClick={() => setEditing(prevState => !prevState)} className="w-30 bg-[#313131] rounded-[8px] transition-all duration-300 ease-in-out hover:bg-[#212121] active:scale-105 ">Edit Collection</button>
                )}
            </div>
            {editing && (
                
                <div className="edit-collection">
                    <h3 >Edit Collection</h3>                    
                    <input type="text" placeholder={collection.name} className="w-4/6 bg-[#212121]"/>
                    <input type="text" placeholder={collection.description} />
                    <button onClick={() => updateCollection(collection) && setEditing(prevState => !prevState)} className="bg-[#414141] w-40 rounded-[5px]">Save</button>
                </div>
            )}
            <p>{collection.description}</p>

            <h3>Items in this Collection:</h3>
            <div className="items">
                {collection.items.map(item => (
                    <Link to={`/shop/${item.id}`}>
                        <div className="item" key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <div className="item-info">
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                <p>&#9733; {item.averageRating}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>  
        </div>
    );
}

function Collections() {
    const { user } = useContext(AuthContext);
    const { collections, error, addCollection, updateCollection } = useContext(CollectionsContext);
    const [showYourCollections, setShowYourCollections] = useState(false);
    
    return (
        <div className="collections-container">
            {collections.length <= 0 ? (
                <>
                <div className="header">
                    <div className="header-content">
                        <h1>No Collections</h1>
                        <h3>There seems to be no collections, be the first to create one!</h3>
                        <button onClick={() => addCollection(user)}>Create a Collection</button>
                    </div>
                </div>
                </>
            ) : (
                <>
                    <div className="header">
                        <h1>Collections</h1>
                        
                    </div>
                    <div className="your-collections-toggle">
                        <button onClick={() => setShowYourCollections(prevState => !prevState)}>
                            {showYourCollections ? "Hide Your Collections" : "Show Your Collections"}
                        </button>
                    </div>
                    {showYourCollections && (
                        user ? (
                            <div className={`your-collections ${showYourCollections ? "show" : ""}`}>
                                <h2>Your Collections</h2>
                                <div className="collection-item-container">
                                    {collections.map(collection => (
                                        <div className="my-collection-item" key={collection.id}>
                                            <Link to={`/collections/${collection.id}`}>
                                                <img src={collection.image} alt={collection.name} />
                                                <h3>{collection.name}</h3>
                                                <p>&#9733; {collection.rating}</p>
                                            </Link>
                                        </div>
                                    ))}
                                    
                                </div>
                            </div>
                        ) : (
                            <div className={`your-collections ${showYourCollections ? "show" : ""}`}>
                                <h3>It does not seem like you are logged in. Please log in to create a collection</h3>
                                <Link to="/signin">Sign In</Link>
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        )
                    )}

                    <div className="all-collections">
                        <div className="regular-collections">
                            <div className="title">
                                <h2>All Collections</h2>
                            </div>
                            <div className="body">
                                {collections.map(collection => (
                                    <div className="collection-item" key={collection.id}>
                                        <Link to={`/collections/${collection.id}`}>
                                            <img src={collection.image} alt={collection.name} />
                                            <h3>{collection.name}</h3>
                                            <div className="collection-item-footer">
                                                <p>{collection.user_id}</p>
                                                <p>&#9733; {collection.rating}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export  {LookingatCollection, Collections} 
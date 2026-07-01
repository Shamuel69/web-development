import React, { useState, useEffect, useRef, useContext } from 'react'

import './css/collections.css';

import { CollectionsContext } from '../context/CollectionsContext.jsx';

import { AuthContext } from '../context/AuthContext';
import { Link, useParams } from 'react-router-dom';

function LookingatCollection() {
    const { id } = useParams();
    const { collections, updateCollection } = useContext(CollectionsContext);
    const collection = collections.find(c => c.id === id);
    const [owner, setOwner] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
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
                }
            }
        };
        fetchOwner();

    }, [collection]);

    useEffect(() => {
        console.log("LookingatCollection: id", id);
        console.log("LookingatCollection: collection", collection);
    }, [id]);

    return (
        <div className="collection">
            <h2>my name grewg{collection.name}
                id: {id}
            </h2>
            {/* <p>{collection[0].description}</p> */}
            {owner && (
                <button onClick={() => updateCollection(collection)}>Edit Collection</button>
            )}
            <h3>Items in this Collection:</h3>
            <div className="items">
                {collection.items.map(item => (
                    <div className="item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                    </div>
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
                    <h1>No Collections</h1>
                    <h3>There seems to be no collections, be the first to create one!</h3>
                    <button onClick={() => addCollection(user)}>Create a Collection</button>
                </div>
                </>
            ) : (
                <>
                    <div className="header">
                        <h1>Collections</h1>
                        <button onClick={() => setShowYourCollections(prevState => !prevState)}>
                            {showYourCollections ? 'Hide Your Collections' : 'Show Your Collections'}
                        </button>
                    </div>

                    {showYourCollections && (
                        user ? (
                            <div className="your-collections">
                                <h2>Your Collections</h2>
                                {collections.map(collection => (
                                    <div className="collection-item" key={collection.id}>
                                        <Link to={`/collections/${collection.id}`}>
                                            <img src={collection.image} alt={collection.name} />
                                            <h3>{collection.name}</h3>
                                            <p>{collection.rating}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="your-collections">
                                <h3>It does not seem like you are logged in. Please log in to create a collection</h3>
                                <Link to="/signin">Sign In</Link>
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        )
                    )}

                    <div className="all-collections">
                        <h2>All Collections</h2>
                        {collections.map(collection => (
                            <div className="collection-item" key={collection.id}>
                                <Link to={`/collections/${collection.id}`}>
                                    <img src={collection.image} alt={collection.name} />
                                    <h3>{collection.name}</h3>
                                    <p>{collection.rating}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export  {LookingatCollection, Collections} 
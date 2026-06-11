import React, { useState, useEffect, useRef, useContext } from 'react'

import './css/collections.css';

import { CollectionsContext } from '../context/CollectionsContext.jsx';

import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


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

export default Collections;
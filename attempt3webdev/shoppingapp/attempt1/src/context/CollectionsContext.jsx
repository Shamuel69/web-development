import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
export const CollectionsContext = createContext();

import {nanoid} from "nanoid";

export const CollectionsProvider = ({ children }) => {
    const { user, updateProfile } = useContext(AuthContext);
    const [collections, setCollections] = useState([]);
    const [error, setError] = useState(null);
    const [recentlyMade, setRecentlyMade] = useState({});
    const [recentlyViewed, setRecentlyViewed] = useState({});
    useEffect(() => {
        const fetchCollections = async() => {
            try {
                const res = await fetch("http://localhost:8080/collections");
                const data = await res.json();
                setCollections(data.collections);

            }catch (err) {
                setError(err.message);
            }
        }
        fetchCollections();
    }, []);

    
    const addCollection = async(user, collection_id=nanoid(10), name=null) =>{
        // adds a new collection to the users profile
        try {
            const packagedCollection = {
                name: name || "New Collection",
                id: collection_id,
                user_id: user.id,
                items: [], 
                description: "This is a new collection.",
                image: "http://localhost:8080/bracelet1.png",
                rating: 0
            };
            
            const res = await fetch("http://localhost:8080/collections", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(packagedCollection)
            })
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server error ${res.status}: ${errorText}`);
            }
            
            const updated_user = {...user, collections: [...user.collections, packagedCollection.id]};
            await updateProfile(updated_user);

            const data = await res.json();
            setRecentlyMade(packagedCollection);
            setCollections([...collections, data.collection]);
        }catch (err) {
            setError(err.message);
        }
    }
    const updateCollection = async(collection) =>{
        // updates collection items like description, image, or if you add more items
        try {
            const res = await fetch(`http://localhost:8080/collections/${collection.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(collection)
            })
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server error ${res.status}: ${errorText}`);
            }
            const data = await res.json();
            setCollections(collections.filter(collection => collection.id !== data.collection.id));
            setCollections([...collections, data.collection]);
        }catch (err) {
            setError("(Called from updateCollection) Failed to update collection \n error: " + err.message);
        }
    }
    const buttonClickHandler = (item) => {
        // used when creating a new collection under a item, like where it says "add to collection" in an item page
        const collection_id = nanoid(10);
        
        addCollection(user, collection_id);
        updateCollection(recentlyMade, item);
    }
    return (
        <CollectionsContext.Provider value={{ collections, addCollection, updateCollection, recentlyMade, setRecentlyMade, recentlyViewed, setRecentlyViewed, buttonClickHandler}}>
            {children}
        </CollectionsContext.Provider>
    )
}
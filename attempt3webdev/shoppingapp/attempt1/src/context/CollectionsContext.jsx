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
                name: name.name || "New Collection",
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
            
            // const updated_user = {...user, collections: [...user.collections, packagedCollection.id]};
            console.log("(I AM IN COLLECTIONS CONTEXT line 52) updated_user", {collections: [...user.collections, packagedCollection.id]});
            updateProfile(user.id, {collections: [...user.collections, packagedCollection.id]}, "collection");

            const data = await res.json();
            setRecentlyMade(packagedCollection);
            setCollections([...collections, data.collection]);
        }catch (err) {
            setError(err.message);
        }
    }
    const updateCollection = async(collection, item =null, action = "add") =>{
        // updates collection items like description, image, or if you add more items
        try {
            if (!collection ) {
                console.error("updateCollection: Invalid collection object", collection);
                throw new Error("Collection not found or invalid collection object.");
            }
            const currentItems = Array.isArray(collection.items) ? collection.items.slice() : [];
            let updatedItems; 
            if (item) {
                if (action === "add") {
                    const Exist = currentItems.some(insideItem => insideItem.id === item.id)
                    if(!Exist) {
                        updatedItems = [...currentItems, item];
                        console.log("updateCollectionx: item", item);
                    }else{
                        updatedItems = currentItems
                    }

                }else if (action === "remove") {
                    updatedItems = currentItems.filter(i => i !== item);
                    console.log("updateCollection: removing item", item);
                } else {
                    updatedItems = currentItems;
                };
            }else {
                updatedItems = currentItems;
            }

            const payload = { items: updatedItems };
            console.log("updateCollection: payload", payload, "collection", collection.id);
            const res = await fetch(`http://localhost:8080/collections/${collection.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            })
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server error ${res.status}: ${errorText}`);
            }
            const data = await res.json();
            console.log("collection updated: ", data);
            setCollections(prev => {
                const exist = prev.find(c => c.id === data.collection.id);
                if (exist) {
                    return prev.map(c => c.id === data.collection.id ? data.collection : c);
                } else {
                    return [...prev, data.collection];
                }
            });
        }catch (err) {
            setError("(Called from updateCollection) Failed to update collection \n error: " + err.message);
        }
    }
    const buttonClickHandler = async (item, collection=null) => {
        // used when creating a new collection under a item, like where it says "add to collection" in an item page
        try {
            if (!item) throw new Error("buttonClickHandler: item is required.");
            if (!collection) {
                console.log("I AM IN PAIN");

                throw new Error("buttonClickHandler: collection is required.");
            }
            if(!collection.id) {
                console.log("collection.id is null" + collection);
                const collectionID_checked = nanoid(10);
                addCollection(user, collectionID_checked, collection);
                updateCollection({id: collectionID_checked}, item);
            }else {
                console.log("buttonClickHandler: item", item, "collectionName", collection, "collectionID", collection.id || "nothing found");
                updateCollection(collection, item);
            }
        }catch (err) {
            setError(err.message);
            return;
        }
    }
    return (
        <CollectionsContext.Provider value={{ collections, addCollection, updateCollection, recentlyMade, setRecentlyMade, recentlyViewed, setRecentlyViewed, buttonClickHandler}}>
            {children}
        </CollectionsContext.Provider>
    )
}
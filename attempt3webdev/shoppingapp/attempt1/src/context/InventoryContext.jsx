import React, { createContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchInventory = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:8080/inventory");
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error("Server error " + res.status + ": " + errorText);
                }
                const data = await res.json();
                if (data.inventory) {
                    setInventory(data.inventory);
                } else {
                    throw new Error("Invalid response format: " + JSON.stringify(data));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);
    const popularItems = () => {
        const popular = inventory.sort((a, b) => (b["times-interacted"] || 0) - (a["times-interacted"] || 0)).slice(0, 10);
        return popular;
    }
    const addToRecent = (item) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const updatedUser = {...user, recentlyViewed: [...user.recentlyViewed, item]};
        localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    const handleInventoryChange = async (updatedInventory) => {
        
        try {
            const res = await fetch("http://localhost:8080/inventory", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedInventory),
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server error ${res.status}: ${errorText}`);
            }
            const data = await res.json();
            setInventory(data.inventory);
            console.log("Inventory updated successfully");
        } catch (err) {
            setError(err.message);
        }
    };
    
    const updateInventory = (newInventory, quantity = false) => {
        if (quantity) {
            const updatedInventory = inventory.map(item => {
                const newItem = newInventory.find(i => i.id === item.id);
                return newItem ? { ...item, quantity: item.quantity + newItem.quantity } : item;
            });
            handleInventoryChange(updatedInventory);
        } else {
            handleInventoryChange(newInventory);
        }
    }

    const removeFromInventory = (itemId, quantity) => {
        const updatedInventory = inventory.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity - quantity };
            }
            return item;
        }).filter(item => item.quantity > 0);
        handleInventoryChange(updatedInventory);
    }
    return (
        <InventoryContext.Provider value={{ inventory, setInventory, loading, setLoading, error, setError, updateInventory, removeFromInventory }}>
            {children}
        </InventoryContext.Provider>
    );
};
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // everything is on localstorage so you should be able to pull the profile from there 
        // and then pull the cart from the profile and set it to cartItems
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setCartItems(JSON.parse(savedUser).cart || []);
            }
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error, 'probably not logged in');
            setError("Failed to load cart. Please log in again.");
        }
    }, []);

    const updateCartInBackend = async (updatedCart, savedUser) => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8080/profiles/${savedUser.id}`, {
            method: "PUT",  // ✅ Changed from POST to PUT
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...savedUser,  // ✅ Send entire user object with updated cart
                cart: updatedCart
            }),
        });
        if (!res.ok) {
            const errorData = await res.text();
            throw new Error(`Server error ${res.status}: ${errorData}`);
        }
        const data = await res.json();
        console.log("Cart updated successfully:", data);
        } catch (error) {
            console.error("Error updating cart in backend:", error);
            setError("Failed to update cart in backend. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    const updateCartInLocalStorage = async (updatedCart) => {
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                user.cart = updatedCart;
                localStorage.setItem('user', JSON.stringify(user));
                setCartItems(updatedCart);
                await updateCartInBackend(updatedCart, user);
            }             
        }catch (error) {
            console.error("Error updating cart in localStorage:", error);
            setError("Failed to update cart. Please try again.");
        }
    }
    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem){
            console.log("existing item found, updating quantity", existingItem);
            const updatedCart = cartItems.map(cartItem => 
                cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
                    : cartItem
            );
            setCartItems(updatedCart);
            updateCartInLocalStorage(updatedCart);
        } else {
            const updatedCart = [...cartItems, { ...item, quantity: item.quantity || 1 }];
            setCartItems(updatedCart);
            updateCartInLocalStorage(updatedCart);            
        }
    };
    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        updateCartInLocalStorage(updatedCart);
    };    
    const getTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => {
            return total + (cartItem.price * (cartItem.quantity || 1));
        }, 0);
    };
    const updateCartItemQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        const updatedCart = cartItems.map(item =>
            item.id === itemId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCartItems(updatedCart);
        updateCartInLocalStorage(updatedCart);
    };
    return (
        <CartContext.Provider value={{ cartItems, setCartItems, error, loading, getTotalPrice, addToCart, removeFromCart, updateCartItemQuantity}}>
            {children}
        </CartContext.Provider>
    );
};


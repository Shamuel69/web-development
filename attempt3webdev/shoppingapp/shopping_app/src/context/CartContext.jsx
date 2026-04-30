import React, { createContext, useState, useEffect } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (err) {
                console.error('Error parsing cart data:', err);
                setCartItems([]);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map(cartItem => 
                    cartItem.id === item.id 
                        ? { ...cartItem, quantity: cartItem.quantity + 1 } 
                        : cartItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        })
    };
    
    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };
    const updateCartItemQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
        }else {
            setCartItems(cartItems.map(item => item.id === itemId ? {...item, quantity} : item));
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
    return (
        <CartContext.Provider value={{ 
            cartItems, 
            setCartItems, 
            addToCart, 
            removeFromCart, 
            clearCart,  
            updateCartItemQuantity,  
            getTotalPrice, 
            getTotalItems,
            loading  
        }}>

            {children}
        </CartContext.Provider>
    );
};
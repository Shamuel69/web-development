import React, { useState } from "react";


export const CartContext = React.createContext();
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = React.useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
        setCartItems(JSON.parse(savedCart));
            setCartItems(JSON.parse(savedCart));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem){
            setCartItems(cartItems.map(cartItem => cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem));
        } else{
            setCartItems([...cartItems, {...item, quantity: 1}])
        }
    };
    
    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    }

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>

            {children}
        </CartContext.Provider>
    );
};
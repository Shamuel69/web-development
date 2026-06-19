import React, { createContext, useState, useEffect } from 'react'
export const CartContext =createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const addToCart = (item, quantity) => {
        setCart([...cart, {...item, quantity: quantity || 1}]);
        setTotal(total + item.price * (quantity || 1));
    }
    return (
        <CartContext.Provider value={{cart, setCart, addToCart, total, setTotal}}>
            {children}
        </CartContext.Provider>
    )
}
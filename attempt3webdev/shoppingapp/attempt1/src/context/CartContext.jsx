import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext';
export const CartContext =createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const { updateProfile } = useContext(AuthContext)
    const user = JSON.parse(localStorage.getItem("user")) || null

    useEffect(() => {
        if (cart.length > 0){
            updateProfile(user.id, {cart: cart})
        }
    }, [cart])

    const addToCart = (item, quantity) => {
        const workableItem = {id: item.id, price: item.price, name: item.name, rating: item.averageRating}
        const newItem = {...workableItem, quantity: quantity || 1};
        const newCart = (!user.cart || user.cart.length === 0) ? [newItem] : [...user.cart, newItem]
        setCart(newCart);
        setTotal(total + item.price * (quantity || 1));
        console.log("I LOOOOOOVE CHOCOLATE " +JSON.stringify(workableItem, null, 2) + quantity)
    }
    return (
        <CartContext.Provider value={{cart, setCart, addToCart, total, setTotal}}>
            {children}
        </CartContext.Provider>
    )
}
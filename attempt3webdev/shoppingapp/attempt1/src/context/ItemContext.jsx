import React, { createContext, useState } from 'react';

export const ItemContext = createContext();



export const ItemProvider = ({ children }) => {
    const [recentlyViewed, setRecentlyViewed] = useState(null);
    
    
    return (
        <ItemContext.Provider value={{ recentlyViewed, setRecentlyViewed }}>
            {children}
        </ItemContext.Provider>
    );
};
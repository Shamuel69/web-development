import  { createContext, useState, useEffect } from 'react';
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
    const showRecentViewed = async (collections=false) => {
        try {
            const recentlyViewed = JSON.parse(localStorage.getItem("recently-viewed")) 
            if(collections) {
                console.log("showRecentViewed test: collection=true ", recentlyViewed.collections);
                return recentlyViewed.collections;
            } else {
                console.log("showRecentViewed test: collection=false ", recentlyViewed.items);
                return recentlyViewed.items;
            }
        }catch (error){
            setError(error.message)
        }
    }

    // if(!user) {
    //     const updateditem = {...item, times_interacted: (item.times_interacted || 0) + 1};
    //     handleInventoryChange(updateditem);
    //     return
    // };
    const addToRecent = async (item, Wishlist=false, type="item" ) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            let recentlyViewed = JSON.parse(localStorage.getItem("recently-viewed")) || {collections: [], items:{}}
            
            
            
            if(Wishlist){
                const updatedUser = {...user, wishlist: [...user.wishlist, item.id]};
                localStorage.setItem("user", JSON.stringify(updatedUser));
                return
            }
        
            // if (!recentlyViewed){
            //     // localStorage.setItem("recently-viewed", JSON.stringify({items: [item]}))
            // } 
            if (type === "item"){
                let updatedItems;
                
                if(recentlyViewed.items.length > 0){
                    const exists = recentlyViewed.items.some(items => items.id === item.id)
                    console.log("snatch")
                    
                    if(exists){
                        updatedItems = recentlyViewed.items.filter(items=>items.id !== item.id);
                        updatedItems = [item, ...updatedItems]
                    } else{
                        updatedItems = [item, ...recentlyViewed.items];        
                    }
                }else{
                    updatedItems = [item];        
                    console.log('baller ', updatedItems)
                }
                
                const updated = {
                    collections: recentlyViewed.collections || [],
                    items: [...updatedItems]
                }
                localStorage.setItem("recently-viewed", JSON.stringify(updated));
                console.log('baller swag', updated)

            }else if(type==="collection") {
                let updatedItems;
                if(recentlyViewed.collections.length > 0){
                    const exists = recentlyViewed.collections.some(collections => collections.id === item.id)
                    
                    if(exists){
                        updatedItems = recentlyViewed.collections.filter(collections=>collections.id !== item.id);
                        updatedItems = [item, ...updatedItems]
                    } else{
                        updatedItems = [item, ...recentlyViewed.collections];        

                    }
                } else{
                    updatedItems = [item];
                }

                const updated = {
                    collections: [...updatedItems],
                    items: recentlyViewed.items || []
                }
                localStorage.setItem("recently-viewed", JSON.stringify(updated));
                console.log('baller ', updated)

            }
            
            // let updateditems;
            // if(!recentlyViewed) {
            //     updateditems = {items: [item]};
            //     localStorage.setItem("recently-viewed", JSON.stringify(updateditems));
            // }else {
            //     if (!recentlyViewed.items) {
            //         updateditems = {items: [item]};
            //         localStorage.setItem("recently-viewed", JSON.stringify(updateditems));
            //         console.log("reel", updateditems)
            //     }else {
            //         updateditems = recentlyViewed.items
            //         const exist = recentlyViewed.items.some(indi => indi.id !== item.id)
            //         console.log("keel", updateditems, exist)
            //         // read this all out loud when your not tired
            //         if (!exist){
            //             localStorage.setItem("recently-viewed", JSON.stringify({items: [item, ...updateditems]}))
            //             console.log("neel", updateditems)
                        
            //         }else {
            //             updateditems = updateditems.filter(indi => indi.id !== item.id)
            //             console.log("FILER TIME!", updateditems)
            //             if (updateditems.length > 1){
            //                 localStorage.setItem("recently-viewed", JSON.stringify({items: [item, ...updateditems]}))
            //                 console.log("beel", updateditems)
            //             } else{
            //                 localStorage.setItem("recently-viewed", JSON.stringify({items: [item]}))
            //                 console.log("weel", updateditems)
            //             }
            //         }
            //         console.log("eel", updateditems)
            //     }


            
            // const updateditem = {...item, times_interacted: (item.times_interacted || 0) + 1};
            // handleInventoryChange(updateditem);
        
        } catch (err) {
            setError(err.message);
        }
    }
    const handleInventoryChange = async (itemID, updatedInventory) => {
        
        try {
            const res = await fetch(`http://localhost:8080/inventory/${itemID}`, {
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
        <InventoryContext.Provider value={{ inventory, setInventory, addToRecent, showRecentViewed,  setLoading, error, setError, updateInventory, removeFromInventory }}>
            {children}
        </InventoryContext.Provider>
    );
};
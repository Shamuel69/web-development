import React, { createContext, useEffect, useState} from "react";
import { nanoid } from "nanoid";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);
    const logout = () => setUser(null);

    function merge_profiles(data, savedUser) {
        const user = typeof savedUser === "string" ? JSON.parse(savedUser) : savedUser;
        const fetched_data = profiles.find(profile => profile.id === user.id) || null;
        if (fetched_data) {
            return { 
                ...fetched_data, 
                cart: user.cart, 
                recentlyViewed: user.recentlyViewed, 
                collections: user.collections, 
                wishlist: user.wishlist, 
                favorites: user.favorites   
            };
        }
        return null;
    }

    useEffect(() => {
        const quickLogin = async () => {
            const savedUser = localStorage.getItem("user");
            if(!savedUser){ 
                const res = await fetch("http://localhost:8080/accounts");
                const data = await res.json();
                console.log(data.profiles);
                return setProfiles(data.profiles);
            }
            // localStorage.setItem("user", JSON.stringify(data.profiles[0])); make a quick function that updates the localstorage
            return setUser();
        }
        quickLogin();
    }, []);

    useEffect(() => {
        console.error("Issue finding the profiles: ", error);
        alert("(Backend) Failed to load profiles \n error: " + error.message);
    }, [error]);
    
    const login = async (userData) => {
        const user_profile = profiles.find(item => 
            item.userName === userData.userName ||
            item.email === userData.email ||
            item.id === userData.id
        )
        if (user_profile) {
            setUser(user_profile);
            localStorage.setItem("user", JSON.stringify(user_profile));
        } else {
            setError("User not found.");
        }
    }
    const signup = async (userData) => {
        if(profiles.find(item => item.email === userData.email)){
            setError("User already exists with this email.");
            return;
        }
        const packagedData = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            id: nanoid(10),
            cart: [],
            recentlyViewed: [],
            collections: [],
            wishlist: [],
            favorites: []
        }
        const res = await fetch("http://localhost:8080/accounts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(packagedData)
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Server error ${res.status}: ${errorText}`);
        }else{
            console.log("Successfully signed up user:", packagedData);
        }
        const data = await res.json();
        if (data.profiles) {
            const found_profile = data.profiles.find(item => item.id === packagedData.id) || null;
            
            if (!found_profile) {
                setError("User not found.");
                return;
            }
            console.log("Found profile:", found_profile);
            setUser(found_profile);
            setProfiles(data.profiles);
            localStorage.setItem("user", JSON.stringify(found_profile));
        } else {
            setError("There was a problem retrieving profile data.");
        }
    }
    return (
        <AuthContext.Provider value={{ user, profiles, error, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

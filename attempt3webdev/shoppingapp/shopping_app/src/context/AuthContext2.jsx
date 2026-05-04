import React, { createContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profiles, setProfiles] = useState([]);
    useEffect(() => {
        try {
            setLoading(true);
            const fetchProfiles = async () => {
                if (!localStorage.getItem("user")) {
                    const res = await fetch("http://localhost:8080/profiles");
                    const data = await res.json();
                    setProfiles(data.profiles);
                    console.log("Received profiles:", data.profiles);
                }else{
                    const savedUser = localStorage.getItem('user');
                    setProfiles(JSON.parse(savedUser));
                    setUser(JSON.parse(savedUser));
                }
            }
            fetchProfiles();
        }  finally{
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error) {
            console.error("Couldn't find profiles:", error);
            alert("(Backend) Failed to load profiles \n error: " + error.message);
        }
    }, [error]);
    const login = async (userData) => {
        setLoading(true);
        
        try {
            if (!userData.id) {
                userData.id = nanoid(10);
                userData.cart = [];
            }
            
            console.log("PROFILES IN DATABASE: \n\n", profiles);
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            // const founduser = profiles.find(item => item.id === userData.id);
            // if (founduser) {
            //     setUser(founduser);
            //     localStorage.setItem("user", JSON.stringify(founduser));
            // }
                
            
            
        } catch (err) {
            setError("(Backend) Failed to log in \n error: " + err.message);
        }
        setLoading(false);
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    const signup = async (userData) => {
    try {
        setLoading(true);
        
        if (profiles.some(p => p.email === userData.email)) {
            setError("User already exists with this email.");
            return;
        }

        // ✅ Generate ID on frontend before sending
        if (!userData.id) {
            userData.id = nanoid(10);
            userData.cart = [];
        }

        console.log("Stage 1: Attempting to sign up user:", userData);

        const res = await fetch("http://localhost:8080/profiles", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData) 
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Server error ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        console.log("Stage 2: Received response from server:", data);

        if (data.user) {
            const updatedProfiles = Array.isArray(profiles) ? profiles : [];
            setProfiles([...updatedProfiles, data.user]);
            
            await login(data.user);
            console.log("Stage 3: User signed up and logged in:", data.user);
        } else {
            setError(data.error || "Failed to create account");
        }
    } catch (err) {
        console.error("Signup error:", err);
        setError("Failed to sign up: " + err.message);
    } finally {
        setLoading(false);
    }
}

    const forgotPassword = (email) => {
        console.log("Forgot password for email:", email);
        // Implement forgot password logic here, e.g., send a reset link to the email
    }
    return (
        <AuthContext.Provider value={{ user, loading, error, signup, login, logout, forgotPassword }}>
            {children}
        </AuthContext.Provider>
    );
}
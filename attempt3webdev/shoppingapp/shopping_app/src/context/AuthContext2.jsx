import React, { createContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profiles, setProfiles] = useState([]);
    useEffect(() => {
        try {
            const fetchProfiles = async () => {
                if (!localStorage.getItem("user")) {
                    const res = await fetch("http://localhost:8080/profiles");
                    const data = await res.json();
                    setProfiles(data.profiles);
                    console.log("Received profiles:", data.profiles);
                    // make it so that when you sign in, it runs a map through the profiles (done?)
                    // and checks if theres a match in id (done?)
                }else{
                    const savedUser = localStorage.getItem('user');
                    setProfiles(JSON.parse(savedUser));
                    setUser(JSON.parse(savedUser));
                }
            }
            fetchProfiles();
        } catch (err) {
            console.error("Couldn't find profiles:", err);
            setError("Failed to load profiles \n error: " + err.message)
        } finally{
            setLoading(false);
            if (error) {
                console.error(error);
                alert("Unexpected error: \n" + error);
            }
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        setUser(userData);
        try {
            {profiles.map((item) => {
                if (item.id === userData.id){
                    setUser(item);
                }
            })}
        } catch (err) {
            console.error(err);
            if (!userData.id) {
                userData.id = nanoid(10);
                userData.cart = [];
            }
            setUser(userData);
        }
        localStorage.setItem("user", JSON.stringify(userData));
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    const signup = async (userData) => {
        try {
            
            if (!localStorage.getItem("user")) {
                const res = await fetch("http://localhost:8080/profiles", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(userData)
                });
                const data =  await res.json();
                login(data.user);
            } else {
                login(userData);
            }
        } catch (err) {
            console.error("Error signing up:", err);
            setError("Failed to sign up \n error: " + err.message);
        }
    }

    const forgotPassword = (email) => {
        console.log("Forgot password for email:", email);
        // Implement forgot password logic here, e.g., send a reset link to the email
    }
    return (
        <AuthContext.Provider value={{ user, loading, error, signup, login, logout, forgotPassword }}
        >
            {children}
        </AuthContext.Provider>
    );
}
import React, { useEffect, useState} from "react";

export const AuthContext = React.createContext({});

export const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (user) => setUser(user);
    const logout = () => setUser(null);

    

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

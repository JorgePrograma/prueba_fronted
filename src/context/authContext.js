import { createContext, useContext, useState } from "react";

export const authContext = createContext(
    {
        user: null,
        token: null,
        setUser: () => { },
        setToken: () => { },
    }
);

export const useAuth = () => {
    const context = useContext(authContext);

    if (!context) throw new Error('There is not')
    return context;
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <authContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </authContext.Provider>)
}
import { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest, registerRequest, getMeRequest } from '../api/AuthApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
            getMeRequest()
                .then(data => setUsername(data.username))
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setIsAuthenticated(false);
                });
        }
    }, []);

    const login = async (username, password) => {
        const { accessToken, refreshToken } = await loginRequest(username, password);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
        const me = await getMeRequest();
        setUsername(me.username);
    };

    const register = async (username, password) => {
        const { accessToken, refreshToken } = await registerRequest(username, password);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
        const me = await getMeRequest();
        setUsername(me.username);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
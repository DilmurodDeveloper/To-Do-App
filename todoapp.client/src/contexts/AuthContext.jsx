import React, { createContext, useState, useEffect } from "react";
import * as authApi from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return null;
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const data = await authApi.login(credentials);
            if (!data.token) throw new Error("Token not received");

            const decodedUser = parseJwt(data.token);

            setToken(data.token);
            setUser(decodedUser);

            return { success: true, user: decodedUser };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || err.message || "Login failed" };
        } finally {
            setLoading(false);
        }
    };

    const register = async (form) => {
        setLoading(true);
        try {
            await authApi.register(form);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || err.message || "Registration failed" };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authApi.logout(); 
        } catch { }

        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/auth";
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

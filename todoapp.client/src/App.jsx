import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import RequireAuth from "./contexts/RequireAuth"; 

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />

            <Route
                path="/user/dashboard"
                element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                }
            />
            <Route
                path="/user/profile"
                element={
                    <RequireAuth>
                        <Profile />
                    </RequireAuth>
                }
            />
        </Routes>
    );
};

export default App;

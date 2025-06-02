import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/user/Dashboard";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default App;

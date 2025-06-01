import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { loginUser, registerUser } from "../../api/Auth"; 
import "./css/AuthPage.css";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = async (data) => {
        try {
            const result = await loginUser(data);
            console.log("Login successful:", result);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleRegister = async (data) => {
        try {
            const result = await registerUser(data);
            console.log("Registration successful:", result);
            alert("Registration successful!");
            setIsLogin(true);
        } catch (error) {
            alert(error.message);
        }
    };

    const showRegisterForm = () => setIsLogin(false);
    const showLoginForm = () => setIsLogin(true);

    return (
        <div className={`auth-page ${isLogin ? "login-active" : "register-active"}`}>
            <div className="auth-toggle">
                <button
                    className={`toggle-btn ${isLogin ? "active" : ""}`}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                <button
                    className={`toggle-btn ${!isLogin ? "active" : ""}`}
                    onClick={() => setIsLogin(false)}
                >
                    Register
                </button>
            </div>

            <div className="auth-form">
                {isLogin ? (
                    <LoginForm onSubmit={handleLogin} onRegisterClick={showRegisterForm} />
                ) : (
                    <RegisterForm onSubmit={handleRegister} onLoginClick={showLoginForm} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;

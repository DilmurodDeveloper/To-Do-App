import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import StepCircleProgress from "../../components/common/StepCircleProgress";
import useAuth from "../../hooks/useAuth";
import "../../../public/css/App.css";

const Auth = () => {
    const storedIsLogin = localStorage.getItem("isLogin");
    const [isLogin, setIsLogin] = useState(storedIsLogin === null ? true : storedIsLogin === "true");
    const { login, register, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const getUserRole = (user) => {
        return user?.role
            || (user?.roles && user.roles[0])
            || user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            || user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"];
    };

    useEffect(() => {
        const navState = location.state?.isLogin;
        if (navState !== undefined) {
            setIsLogin(navState);
            localStorage.setItem("isLogin", navState.toString());
        }
    }, [location.state]);

    useEffect(() => {
        localStorage.setItem("isLogin", isLogin.toString());
    }, [isLogin]);

    useEffect(() => {
        if (user) {
            const userRole = getUserRole(user);
            if (userRole === "Admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/dashboard");
            }
        }
    }, [user, navigate]);

    const handleLogin = async (form) => {
        const res = await login(form);
        if (res.success) {
            const userRole = getUserRole(res.user);
            if (userRole === "Admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/dashboard");
            }
        } else {
            alert(res.error);
        }
    };

    const handleRegister = async (form) => {
        const res = await register(form);
        if (res.success) {
            alert("Registration successful!");
            setIsLogin(true);
        } else {
            alert(res.error);
        }
    };

    return (
        <div className={`auth-page ${isLogin ? "login-active" : "register-active"} position-relative`} >
            <div className="auth-toggle">
                <button className={`toggle-btn ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>Login</button>
                <button className={`toggle-btn ${!isLogin ? "active" : ""}`} onClick={() => setIsLogin(false)}>Register</button>
            </div>
            <div className="auth-form">
                {!isLogin && <StepCircleProgress step={1} />}
                {isLogin ? (
                    <LoginForm onSubmit={handleLogin} onRegisterClick={() => setIsLogin(false)} />
                ) : (
                    <RegisterForm onSubmit={handleRegister} onLoginClick={() => setIsLogin(true)} />
                )}
            </div>
        </div>
    );
};

export default Auth;

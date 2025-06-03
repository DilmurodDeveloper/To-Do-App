import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../public/css/App.css";
import useAuth from "./hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();
    const isAuthenticated = !!user;

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    const userName = user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 px-4 sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold text-primary" to="/">MyApp</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <div className="d-flex ms-auto align-items-center">
                        {!isAuthenticated && (
                            <>
                                <Link
                                    to="/auth"
                                    state={{ isLogin: true }}
                                    className="btn btn-outline-primary me-2"
                                >
                                    <i className="fas fa-sign-in-alt me-1"></i>
                                    Login
                                </Link>
                                <Link
                                    to="/auth"
                                    state={{ isLogin: false }}
                                    className="btn btn-primary"
                                >
                                    <i className="fas fa-user-plus me-1"></i>
                                    Register
                                </Link>
                            </>
                        )}

                        {isAuthenticated && (
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                                    type="button"
                                    id="profileDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user-circle fa-lg me-2"></i>
                                    {userName}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/user/profile">
                                            <i className="fas fa-user me-2"></i> Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt me-2"></i> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

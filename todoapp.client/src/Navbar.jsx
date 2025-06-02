import React from "react";
import { Link } from "react-router-dom";
import "../public/css/App.css";
import useAuth from "./hooks/useAuth";

const Navbar = () => {
    const { user } = useAuth();
    const isAuthenticated = !!user;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 px-4 sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold text-primary">MyApp</Link>

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
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/features">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>

                    {!isAuthenticated && (
                        <div className="d-flex">
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
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

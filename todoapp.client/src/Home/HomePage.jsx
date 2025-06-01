import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <div className="left-side">
                <h1>Welcome To Do</h1>
                <p>Manage groups, add collaborators, and track tasks efficiently for better teamwork.</p>
                <div className="button-container">
                    <button className="btn-primary" onClick={() => navigate('/auth')}>
                        Get Ready <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                    </button>
                </div>
            </div>
            <div className="right-side">
                <div className="image-wrapper">
                    <img src="/images/illustration5.png" alt="Center Illustration" className="center-image" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;

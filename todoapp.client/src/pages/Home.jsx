import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/css/App.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <div className="left-side">
                <h1>Welcome To Do</h1>
                <small> Manage groups, add collaborators, and track tasks efficiently for better teamwork.
                    Organize your projects effortlessly by creating custom groups, assigning roles, and
                    setting deadlines. Collaborate in real-time, monitor progress with task status updates,
                    and streamline communication between team members. </small>
                <div className="button-container">
                    <button className="btn-primary" onClick={() => navigate('/auth')}>
                        Sign Up for Free
                    </button>
                </div>
            </div>
            <div className="right-side">
                <div className="image-wrapper">
                    <img src="/images/illustration1.png" alt="Center Illustration" className="center-image" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;

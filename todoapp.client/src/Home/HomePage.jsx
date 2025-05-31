import React from 'react';
import './css/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="left-side">
        <h1 className="typewriter">Welcome to ToDoApp</h1>
        <p><b>Manage groups, add collaborators, and track tasks efficiently for better teamwork.</b></p>
        <div className="button-container">
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
      <div className="right-side">
        <img src="/public/images/illustration3.png" alt="Center Illustration" className="center-image" />
      </div>
    </div>
  );
};

export default HomePage;

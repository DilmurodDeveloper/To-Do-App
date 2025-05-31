import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './Auth/components/LoginForm';
import RegisterForm from './Auth/components/RegisterForm';
import HomePage from './Home/HomePage';

const App = () => {
  const handleLogin = (data) => {
    console.log('Login data:', data);
  };

  const handleRegister = (data) => {
    console.log('Register data:', data);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm onSubmit={handleLogin} />} />
      <Route path="/register" element={<RegisterForm onSubmit={handleRegister} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

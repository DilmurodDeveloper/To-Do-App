import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './Auth/pages/AuthPage';
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
          <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

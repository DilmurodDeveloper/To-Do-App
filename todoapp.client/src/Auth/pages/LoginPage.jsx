import React, { useState } from "react";
import { loginUser } from "../api/auth";

const LoginPage = () => {
  const [form, setForm] = useState({
    userNameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setToken(null);

    try {
      const result = await loginUser(form);
      setToken(result.token);
      // Tokenni localStorage yoki context/state da saqlashingiz mumkin
      localStorage.setItem("token", result.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {token && <p style={{ color: "green" }}>Login successful! Token: {token}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="userNameOrEmail"
          value={form.userNameOrEmail}
          onChange={handleChange}
          placeholder="Email or Username"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

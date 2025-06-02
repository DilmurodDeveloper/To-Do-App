import axios from "axios";

const API_URL = "https://localhost:7224/api/Auth";

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const register = (data) => axios.post(`${API_URL}/register`, data).then(res => res.data);
export const login = (data) => axios.post(`${API_URL}/login`, data).then(res => res.data);
export const logout = () => axios.post(`${API_URL}/logout`).then(res => res.data);

export const confirmEmail = (data) => axios.post(`${API_URL}/confirm-email`, data).then(res => res.data);
export const forgotPassword = (data) => axios.post(`${API_URL}/forgot-password`, data).then(res => res.data);
export const resetPassword = (data) => axios.post(`${API_URL}/reset-password`, data).then(res => res.data);

export const refreshToken = (data) => axios.post(`${API_URL}/refresh-token`, data).then(res => res.data);

export const generateConfirmToken = (email) =>
    axios.post(`${API_URL}/generate-confirm-token`, email, {
        headers: { "Content-Type": "application/json" }
    }).then(res => res.data);

export const generateResetToken = (data) =>
    axios.post(`${API_URL}/generate-reset-token`, data).then(res => res.data);

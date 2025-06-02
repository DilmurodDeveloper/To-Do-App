import axios from '../utils/axiosInstance';

const API_URL = '/api/User';

export const getAllUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status === 204;
};

export const updateUser = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const getProfile = async () => {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
};

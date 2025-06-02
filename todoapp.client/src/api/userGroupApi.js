import axios from '../utils/axiosInstance';

const API_URL = '/api/UserGroup';

export const getUsersInGroup = async (groupId) => {
    const response = await axios.get(`${API_URL}/group/${groupId}/users`);
    return response.data;
};

export const getGroupsForUser = async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}/groups`);
    return response.data;
};

export const addUserToGroup = async (userId, groupId) => {
    const response = await axios.post(`${API_URL}/add`, {
        userId,
        groupId,
    });
    return response.data;
};

export const removeUserFromGroup = async (userId, groupId) => {
    const response = await axios.delete(`${API_URL}/remove`, {
        data: {
            userId,
            groupId,
        },
    });
    return response.data;
};

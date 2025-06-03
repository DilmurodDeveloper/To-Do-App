import api from "./index";

export const getAllUsers = async () => {
    try {
        const response = await api.get("/user");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return { success: false, error: error.response?.data?.message || "Could not fetch users" };
    }
};

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/user/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to fetch user ${id}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not fetch user" };
    }
};

export const deleteUser = async (id) => {
    try {
        await api.delete(`/user/${id}`);
        return { success: true };
    } catch (error) {
        console.error(`Failed to delete user ${id}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not delete user" };
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/user/${id}`, userData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to update user ${id}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not update user" };
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get("/user/profile");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        return { success: false, error: error.response?.data?.message || "Could not fetch profile" };
    }
};

import api from "./index";

export const getUserTasks = async (userId) => {
    if (!userId) {
        return {
            success: false,
            error: "User ID is required to fetch tasks.",
        };
    }
    try {
        const response = await api.get(`/task/user/${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Failed to fetch user tasks:", error);
        return {
            success: false,
            error: error.response?.data?.message || "Could not fetch user tasks",
        };
    }
};

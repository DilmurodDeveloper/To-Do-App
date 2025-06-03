import api from "./index";

export const getTasksByGroup = async (groupId) => {
    try {
        const response = await api.get(`/task/group/${groupId}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to fetch tasks for group ${groupId}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not fetch tasks" };
    }
};

export const getTaskById = async (id) => {
    try {
        const response = await api.get(`/task/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to fetch task ${id}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not fetch task" };
    }
};

export const getTasksByUser = async (userId) => {
    try {
        const response = await api.get(`/task/user/${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to fetch tasks for user ${userId}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not fetch tasks" };
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await api.post("/task", taskData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Failed to create task:", error);
        return { success: false, error: error.response?.data?.message || "Could not create task" };
    }
};

export const updateTask = async (id, taskData) => {
    try {
        await api.put(`/task/${id}`, taskData);
        return { success: true };
    } catch (error) {
        console.error(`Failed to update task ${id}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not update task" };
    }
};

export const deleteTask = async (id) => {
    try {
        await api.delete(`/task/${id}`);
        return { success: true };
    } catch (error) {
        console.error(`Failed to delete task ${id}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not delete task" };
    }
};

export const changeTaskStatus = async (id, status) => {
    try {
        await api.put(`/task/${id}/status`, { status });
        return { success: true };
    } catch (error) {
        console.error(`Failed to change status of task ${id}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not change task status" };
    }
};

export const assignTaskToUser = async (taskId, userId) => {
    try {
        await api.put(`/task/${taskId}/assign/${userId}`);
        return { success: true };
    } catch (error) {
        console.error(`Failed to assign task ${taskId} to user ${userId}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not assign task" };
    }
};

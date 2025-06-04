import api from "./index";

export const getAllGroups = async () => {
    try {
        const response = await api.get("/group");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Failed to fetch all groups:", error);
        return { success: false, error: error.response?.data?.message || "Could not fetch groups" };
    }
};

export const getGroupById = async (id) => {
    try {
        const response = await api.get(`/group/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to fetch group ${id}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not fetch group" };
    }
};

export const createGroup = async (groupData) => {
    try {
        const response = await api.post("/group", groupData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Failed to create group:", error);
        return { success: false, error: error.response?.data?.message || "Could not create group" };
    }
};

export const updateGroup = async (id, groupData) => {
    try {
        await api.put(`/group/${id}`, groupData);
        return { success: true };
    } catch (error) {
        console.error(`Failed to update group ${id}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not update group" };
    }
};

export const deleteGroup = async (id) => {
    try {
        await api.delete(`/group/${id}`);
        return { success: true };
    } catch (error) {
        console.error(`Failed to delete group ${id}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not delete group" };
    }
};

export const getGroupsCreatedByUser = async () => {
    try {
        const response = await api.get("/group/created-by-me");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Failed to fetch groups created by user:", error);
        return { success: false, error: error.response?.data?.message || "Could not fetch groups created by user" };
    }
};

export const getGroupsUserIsMemberOf = async () => {
    try {
        const response = await api.get("/group/member-of");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Failed to fetch groups user is member of:", error);
        return { success: false, error: error.response?.data?.message || "Could not fetch groups user is member of" };
    }
};

export const leaveGroup = async (groupId) => {
    try {
        await api.post(`/group/${groupId}/leave`);
        return { success: true };
    } catch (error) {
        console.error(`Failed to leave group ${groupId}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not leave group" };
    }
};

export const joinGroup = async (groupId) => {
    try {
        const response = await api.post(`/group/${groupId}/join`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to join group ${groupId}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not join group" };
    }
};

export const addMember = async (groupId, userId) => {
    try {
        const response = await api.post(`/group/${groupId}/members`, { userId });
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to add member to group ${groupId}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not add member to group" };
    }
};
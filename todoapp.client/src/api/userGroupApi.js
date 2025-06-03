import api from "./index";

export const getUsersInGroup = async (groupId) => {
    try {
        const response = await api.get(`/usergroup/group/${groupId}/users`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to fetch users in group ${groupId}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not fetch users in group" };
    }
};

export const getGroupsForUser = async (userId) => {
    try {
        const response = await api.get(`/usergroup/user/${userId}/groups`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to fetch groups for user ${userId}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not fetch groups for user" };
    }
};

export const addUserToGroup = async (userId, groupId) => {
    try {
        const response = await api.post("/usergroup/add", { userId, groupId });
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to add user ${userId} to group ${groupId}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not add user to group" };
    }
};

export const removeUserFromGroup = async (userId, groupId) => {
    try {
        const response = await api.delete("/usergroup/remove", { data: { userId, groupId } });
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Failed to remove user ${userId} from group ${groupId}:`, error);
        return { success: false, error: error.response?.data?.message || "Could not remove user from group" };
    }
};

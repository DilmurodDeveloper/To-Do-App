import api from "./index";

export const getGroupsCreatedByUser = async () => {
    try {
        const response = await api.get("/Group/created-by-me");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Failed to fetch groups created by user:", error);
        return {
            success: false,
            error: error.response?.data?.message || "Could not fetch groups created by user",
        };
    }
};

export const getGroupsUserIsMemberOf = async () => {
    try {
        const response = await api.get("/Group/member-of"); 
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Failed to fetch groups user is member of:", error);
        return { success: false, error: error.response?.data?.message || "Could not fetch groups user is member of" };
    }
};

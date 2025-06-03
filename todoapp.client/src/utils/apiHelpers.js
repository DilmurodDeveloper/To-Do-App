export const parseApiError = (error) => {
    if (!error.response) {
        return "Could not connect to the server.";
    }

    const status = error.response.status;
    const data = error.response.data;

    if (typeof data === "string") return data;
    if (data.message) return data.message;
    if (data.errors) {
        const allErrors = Object.values(data.errors).flat();
        return allErrors.join(" ");
    }

    switch (status) {
        case 400: return "The survey is incorrectly structured.";
        case 401: return "Authorization is required.";
        case 403: return "Unauthorized action.";
        case 404: return "Not found.";
        case 500: return "An internal error occurred on the server.";
        default: return `An error occurred. (status: ${status}).`;
    }
};

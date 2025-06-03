import React from "react";

const UserProfile = ({ user }) => {
    if (!user) {
        return <p className="text-muted">No user data available.</p>;
    }

    return (
        <div className="card shadow-sm p-3">
            <h4>{user.name || user.email}</h4>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role || "User"}</p>
            <p><strong>Joined:</strong> {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "Unknown"}</p>
        </div>
    );
};

export default UserProfile;

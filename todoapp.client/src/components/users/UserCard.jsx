import React from "react";

const UserCard = ({ user }) => {
    return (
        <div className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h6 className="mb-1">{user.name || user.email}</h6>
                <small className="text-muted">{user.email}</small>
            </div>
            <span className="badge bg-secondary rounded-pill">{user.role || "User"}</span>
        </div>
    );
};

export default UserCard;

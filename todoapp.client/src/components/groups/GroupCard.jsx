import React from "react";

const GroupCard = ({ group }) => {
    return (
        <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{group.name}</h5>
                <p className="card-text text-truncate">{group.description || "No description"}</p>
                <div className="mt-auto">
                    <small className="text-muted">Members: {group.memberCount || 0}</small>
                </div>
            </div>
        </div>
    );
};

export default GroupCard;

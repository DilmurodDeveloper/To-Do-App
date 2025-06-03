import React from "react";

const UserGroupsList = ({ groups = [] }) => {
    if (groups.length === 0) {
        return <p className="text-muted">You are not a member of any groups.</p>;
    }

    return (
        <ul className="list-group">
            {groups.map(group => (
                <li key={group.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {group.name}
                    <span className="badge bg-success rounded-pill">{group.membersCount || 0} members</span>
                </li>
            ))}
        </ul>
    );
};

export default UserGroupsList;

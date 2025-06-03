import React from "react";

const GroupMembersList = ({ members = [] }) => {
    if (members.length === 0) {
        return <p className="text-muted">No members in this group.</p>;
    }

    return (
        <ul className="list-group">
            {members.map(member => (
                <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {member.name || member.email}
                    <span className="badge bg-info rounded-pill">{member.role || "Member"}</span>
                </li>
            ))}
        </ul>
    );
};

export default GroupMembersList;

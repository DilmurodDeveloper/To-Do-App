import React from "react";
import GroupCard from "./GroupCard";

const GroupList = ({ groups }) => {
    if (!groups || groups.length === 0) {
        return <p className="text-muted">No groups found.</p>;
    }

    return (
        <div className="row g-3">
            {groups.map(group => (
                <div key={group.id} className="col-md-6 col-lg-4">
                    <GroupCard group={group} />
                </div>
            ))}
        </div>
    );
};

export default GroupList;

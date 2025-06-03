import React, { useEffect, useState } from "react";
import { getAllGroups } from "../../../api/groupApi";

const GroupsList = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const res = await getAllGroups();
            if (res.success) setGroups(res.data);
        };
        fetchGroups();
    }, []);

    return (
        <div className="container mt-4">
            <h2>All Groups</h2>
            <ul className="list-group">
                {groups.map(group => (
                    <li key={group.id} className="list-group-item">
                        {group.name} - {group.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupsList;

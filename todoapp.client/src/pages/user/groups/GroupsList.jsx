import React, { useEffect, useState } from "react";
import { getGroupsUserIsMemberOf, getGroupsCreatedByUser } from "../../../api/groupApi";

const GroupsList = () => {
    const [createdGroups, setCreatedGroups] = useState([]);
    const [memberGroups, setMemberGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const created = await getGroupsCreatedByUser();
            const member = await getGroupsUserIsMemberOf();
            if (created.success) setCreatedGroups(created.data);
            if (member.success) setMemberGroups(member.data);
        };
        fetchGroups();
    }, []);

    return (
        <div className="container py-4">
            <h2>Your Created Groups</h2>
            <ul>
                {createdGroups.map(group => (
                    <li key={group.id}>{group.name}</li>
                ))}
            </ul>

            <h2 className="mt-4">Groups You Are In</h2>
            <ul>
                {memberGroups.map(group => (
                    <li key={group.id}>{group.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default GroupsList;
import React, { useEffect, useState } from "react";
import { getAllUserGroups } from "../../../api/userGroupApi";

const UserGroupsList = () => {
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        const fetchUserGroups = async () => {
            const res = await getAllUserGroups();
            if (res.success) setUserGroups(res.data);
        };
        fetchUserGroups();
    }, []);

    return (
        <div className="container mt-4">
            <h2>All User Groups</h2>
            <ul className="list-group">
                {userGroups.map(ug => (
                    <li key={ug.id} className="list-group-item">
                        User: {ug.userId}, Group: {ug.groupId}, Role: {ug.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserGroupsList;

import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../api/userApi";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllUsers();
            if (res.success) setUsers(res.data);
        };
        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h2>All Users</h2>
            <ul className="list-group">
                {users.map(user => (
                    <li key={user.id} className="list-group-item">
                        {user.email} - {user.userName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;

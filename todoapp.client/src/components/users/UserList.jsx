import React from "react";
import UserCard from "./UserCard";

const UserList = ({ users = [] }) => {
    if (users.length === 0) {
        return <p className="text-muted">No users found.</p>;
    }

    return (
        <div className="list-group">
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UserList;

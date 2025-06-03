import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../api/userApi";

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserById(id);
            if (res.success) setUser(res.data);
        };
        fetchUser();
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>User Details</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.userName}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
};

export default UserDetails;

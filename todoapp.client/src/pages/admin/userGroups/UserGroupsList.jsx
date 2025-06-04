import React, { useEffect, useState } from "react";

const AdminUserGroupsList = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = "some-user-guid"; 

    const fetchUserGroups = async () => {
        try {
            const response = await fetch(`/api/user/user/${userId}/groups`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch user groups");
            const data = await response.json();
            setUserGroups(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserGroups();
    }, []);

    if (loading) return <p>Loading user groups...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>User Groups</h2>
            {userGroups.length === 0 && <p>User is not part of any groups.</p>}
            <ul>
                {userGroups.map(group => (
                    <li key={group.id}>{group.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUserGroupsList;

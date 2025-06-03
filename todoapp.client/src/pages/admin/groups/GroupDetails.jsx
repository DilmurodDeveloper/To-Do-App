import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupById } from "../../../api/groupApi";

const GroupDetails = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);

    useEffect(() => {
        const fetchGroup = async () => {
            const res = await getGroupById(id);
            if (res.success) setGroup(res.data);
        };
        fetchGroup();
    }, [id]);

    if (!group) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>Group Details</h2>
            <p><strong>Name:</strong> {group.name}</p>
            <p><strong>Description:</strong> {group.description}</p>
            <p><strong>Created At:</strong> {new Date(group.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default GroupDetails;

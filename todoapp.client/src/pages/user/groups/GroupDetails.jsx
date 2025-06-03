import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupById } from "../../../api/groupApi";

const GroupDetails = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);

    useEffect(() => {
        const fetchGroup = async () => {
            const response = await getGroupById(groupId);
            if (response.success) setGroup(response.data);
        };
        fetchGroup();
    }, [groupId]);

    if (!group) return <div>Loading...</div>;

    return (
        <div className="container py-4">
            <h2>{group.name}</h2>
            <p>Description: {group.description}</p>
            <p>Created at: {new Date(group.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default GroupDetails;
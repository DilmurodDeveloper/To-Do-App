import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/admin/groups')
            .then(res => {
                setGroups(res.data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading groups...</p>;

    return (
        <div>
            <h2>Groups List</h2>
            <Link to="/admin/groups/new" className="btn btn-primary">Add New Group</Link>
            <ul className="list-group mt-3">
                {groups.map(group => (
                    <li key={group.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {group.name}
                        <Link to={`/admin/groups/${group.id}`} className="btn btn-info btn-sm">Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupsList;

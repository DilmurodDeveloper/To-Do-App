import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminGroupDetails = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/admin/groups/${groupId}`)
            .then(res => {
                setGroup(res.data);
                setName(res.data.name);
                setLoading(false);
            })
            .catch(() => {
                alert('Group not found');
                navigate('/admin/groups');
            });
    }, [groupId, navigate]);

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/admin/groups/${groupId}`, { name });
            alert('Group updated');
            navigate('/admin/groups');
        } catch {
            alert('Failed to update group');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure to delete this group?')) return;
        try {
            await axios.delete(`/api/admin/groups/${groupId}`);
            alert('Group deleted');
            navigate('/admin/groups');
        } catch {
            alert('Failed to delete group');
        }
    };

    if (loading) return <p>Loading group details...</p>;

    return (
        <div>
            <h2>Group Details</h2>
            <input value={name} onChange={e => setName(e.target.value)} className="form-control mb-3" />
            <button onClick={handleUpdate} className="btn btn-primary me-2">Save</button>
            <button onClick={handleDelete} className="btn btn-danger me-2">Delete</button>
            <button onClick={() => navigate('/admin/groups')} className="btn btn-secondary">Back</button>
        </div>
    );
};

export default AdminGroupDetails;

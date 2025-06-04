import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/admin/users/${userId}`)
            .then(res => {
                setUser(res.data);
                setForm({
                    firstName: res.data.firstName || '',
                    lastName: res.data.lastName || '',
                    phoneNumber: res.data.phoneNumber || ''
                });
                setLoading(false);
            })
            .catch(() => {
                alert('User not found');
                navigate('/admin/users');
            });
    }, [userId, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/admin/users/${userId}`, form);
            alert('User updated successfully');
            navigate('/admin/users');
        } catch {
            alert('Failed to update user');
        }
    };

    if (loading) return <p>Loading user details...</p>;

    return (
        <div>
            <h2>User Details: {user.email}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label>Phone Number</label>
                    <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button onClick={() => navigate('/admin/users')} type="button" className="btn btn-secondary ms-2">Back</button>
            </form>
        </div>
    );
};

export default UserDetails;

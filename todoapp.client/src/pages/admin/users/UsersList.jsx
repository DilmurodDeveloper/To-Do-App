import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getToken();
                const res = await axios.get('https://localhost:7224/api/admin/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const token = getToken();
            await axios.delete(`https://localhost:7224/api/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(users.filter(user => user.id !== id));
        } catch {
            alert('Failed to delete user.');
        }
    };

    if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    if (error) return <div className="alert alert-danger text-center my-3">{error}</div>;

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Users List</h2>
                <Link to="/admin/users/new" className="btn btn-success">
                    <i className="fas fa-user-plus me-2"></i> Add New User
                </Link>
            </div>

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Email</th>
                            <th>UserName</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.email}</td>
                                <td>{u.userName}</td>
                                <td>{u.firstName}</td>
                                <td>{u.lastName}</td>
                                <td>{u.phoneNumber || <span className="text-muted fst-italic">No phone</span>}</td>
                                <td className="text-center">
                                    <Link
                                        to={`/admin/users/${u.id}`}
                                        className="btn btn-info btn-sm me-2"
                                        title="User Details"
                                    >
                                        <i className="fas fa-info-circle"></i>
                                    </Link>
                                    <Link
                                        to={`/admin/users/edit/${u.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                        title="Edit User"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button
                                        onClick={() => deleteUser(u.id)}
                                        className="btn btn-danger btn-sm"
                                        title="Delete User"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-muted py-4">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersList;

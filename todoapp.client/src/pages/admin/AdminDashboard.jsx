import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container my-5">
            <h1 className="text-primary mb-4">Admin Dashboard</h1>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <i className="fas fa-users fa-2x text-success mb-3"></i>
                            <h5 className="card-title">Manage Users</h5>
                            <p className="card-text">View, edit or delete system users.</p>
                            <Link to="/admin/users" className="btn btn-outline-success">
                                Go to Users
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <i className="fas fa-plus-circle fa-2x text-primary mb-3"></i>
                            <h5 className="card-title">Add New User</h5>
                            <p className="card-text">Create a new user account in the system.</p>
                            <Link to="/admin/users/new" className="btn btn-outline-primary">
                                Add User
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <i className="fas fa-chart-line fa-2x text-info mb-3"></i>
                            <h5 className="card-title">Statistics (Coming Soon)</h5>
                            <p className="card-text">System insights and analytics overview.</p>
                            <button className="btn btn-outline-secondary" disabled>
                                Coming Soon
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

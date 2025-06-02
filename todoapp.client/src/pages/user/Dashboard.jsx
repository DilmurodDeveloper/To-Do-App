import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getUserTasks } from "../../api/taskApi";
import { getGroupsCreatedByUser, getGroupsUserIsMemberOf } from "../../api/groupApi";
import Spinner from "../../components/common/Spinner";
import "../../../public/css/App.css";
import Navbar from "../../Navbar";

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [createdGroups, setCreatedGroups] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userId = user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const [taskRes, createdGroupsRes, joinedGroupsRes] = await Promise.all([
                    getUserTasks(userId),
                    getGroupsCreatedByUser(),
                    getGroupsUserIsMemberOf()
                ]);

                if (taskRes.success) setTasks(taskRes.data);
                if (createdGroupsRes.success) setCreatedGroups(createdGroupsRes.data);
                if (joinedGroupsRes.success) setJoinedGroups(joinedGroupsRes.data);
            } catch (error) {
                console.error("Error loading dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) return <Spinner />;

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bold">Hi, {user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User"} 👋</h1>
                    <p className="text-muted">Welcome to your personal dashboard</p>
                </div>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-2">My Tasks</h5>
                                <p className="card-text text-muted">Total: <strong>{tasks.length}</strong></p>
                                <button onClick={() => navigate("/user/tasks")} className="btn btn-outline-primary mt-auto">
                                    Manage Tasks
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-2">My Created Groups</h5>
                                <p className="card-text text-muted">Total: <strong>{createdGroups.length}</strong></p>
                                <button onClick={() => navigate("/user/groups")} className="btn btn-outline-success mt-auto">
                                    View Groups
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-2">My Joined Groups</h5>
                                <p className="card-text text-muted">Total: <strong>{joinedGroups.length}</strong></p>
                                <button onClick={() => navigate("/user/groups")} className="btn btn-outline-info mt-auto">
                                    See Memberships
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h4 className="mb-3">Upcoming Tasks</h4>
                    {tasks.length === 0 ? (
                        <p className="text-muted">No tasks available right now.</p>
                    ) : (
                        <ul className="list-group rounded shadow-sm">
                            {tasks.slice(0, 5).map(task => (
                                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="fw-medium">{task.title}</span>
                                    <span className="badge bg-light text-dark">
                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;

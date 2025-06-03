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

    const renderTasksPreview = () => {
        if (tasks.length === 0) return <small className="text-muted">No tasks available</small>;

        return (
            <ul className="list-unstyled mb-0 small">
                {tasks.slice(0, 3).map(task => (
                    <li key={task.id} className="text-truncate">
                        {task.title}
                    </li>
                ))}
                {tasks.length > 3 && <li className="text-muted">and more...</li>}
            </ul>
        );
    };

    const renderGroupsPreview = (groups) => {
        if (groups.length === 0) return <small className="text-muted">No groups found</small>;

        return (
            <ul className="list-unstyled mb-0 small">
                {groups.slice(0, 3).map(group => (
                    <li key={group.id} className="text-truncate">
                        {group.name}
                    </li>
                ))}
                {groups.length > 3 && <li className="text-muted">and more...</li>}
            </ul>
        );
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bold">
                        Hi, {user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User"} 👋
                    </h1>
                    <p className="text-muted">Welcome to your personal dashboard</p>
                </div>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-2">My Tasks</h5>
                                <p className="card-text text-muted">
                                    Total: <strong>{tasks.length}</strong>
                                </p>

                                {renderTasksPreview()}

                                <button
                                    onClick={() => navigate("/user/tasks")}
                                    className="btn btn-outline-primary mt-auto"
                                >
                                    Manage Tasks
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-2">My Created Groups</h5>
                                <p className="card-text text-muted">
                                    Total: <strong>{createdGroups.length}</strong>
                                </p>

                                {renderGroupsPreview(createdGroups)}

                                <button
                                    onClick={() => navigate("/user/groups")}
                                    className="btn btn-outline-success mt-auto"
                                >
                                    View Groups
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-2">My Joined Groups</h5>
                                <p className="card-text text-muted">
                                    Total: <strong>{joinedGroups.length}</strong>
                                </p>

                                {renderGroupsPreview(joinedGroups)}

                                <button
                                    onClick={() => navigate("/user/groups")}
                                    className="btn btn-outline-info mt-auto"
                                >
                                    See Memberships
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

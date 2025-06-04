import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await fetch("/api/admin/tasks", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch tasks");
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Tasks List</h2>
            <Link to="/admin/tasks/create" className="btn btn-primary">Create New Task</Link>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Group</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length === 0 && <tr><td colSpan={5}>No tasks found.</td></tr>}
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td>{task.status}</td>
                            <td>{task.groupId}</td>
                            <td>
                                <Link to={`/admin/tasks/${task.id}`} className="btn btn-sm btn-info me-2">Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TasksList;

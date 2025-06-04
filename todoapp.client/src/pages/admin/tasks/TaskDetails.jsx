import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TaskDetails = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTask = async () => {
        try {
            const response = await fetch(`/api/admin/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch task details");
            const data = await response.json();
            setTask(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [taskId]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            const response = await fetch(`/api/admin/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) throw new Error("Failed to delete task");
            alert("Task deleted successfully");
            navigate("/admin/tasks");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    if (loading) return <p>Loading task details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!task) return <p>Task not found.</p>;

    return (
        <div>
            <h2>Task Details</h2>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Group ID:</strong> {task.groupId}</p>
            <p><strong>Assigned To User ID:</strong> {task.assignedToUserId || "Not assigned"}</p>

            <button onClick={() => navigate(`/admin/tasks/edit/${task.id}`)} className="btn btn-warning me-2">Edit</button>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            <button onClick={() => navigate("/admin/tasks")} className="btn btn-secondary ms-2">Back to list</button>
        </div>
    );
};

export default TaskDetails;

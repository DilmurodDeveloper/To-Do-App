import React from "react";

const TaskCard = ({ task }) => {
    return (
        <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text text-truncate">{task.description || "No description"}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                    </small>
                    <span className="badge bg-primary">{task.status || "Pending"}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;

import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
    if (!tasks || tasks.length === 0) {
        return <p className="text-muted">No tasks found.</p>;
    }

    return (
        <div className="row g-3">
            {tasks.map(task => (
                <div key={task.id} className="col-md-6 col-lg-4">
                    <TaskCard task={task} />
                </div>
            ))}
        </div>
    );
};

export default TaskList;

import React from "react";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
    const { taskId } = useParams();

    return (
        <div>
            <h2>Task Details</h2>
            <p>Task ID: {taskId}</p>
        </div>
    );
};

export default TaskDetails;

import React, { useEffect, useState } from "react";
import { getUserTasks } from "../../../api/taskApi";

const TasksList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const result = await getUserTasks();
            if (result.success) setTasks(result.data);
        };
        fetchTasks();
    }, []);

    return (
        <div className="container py-4">
            <h2>Your Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title} - {task.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default TasksList;

import React, { useEffect, useState } from "react";
import { getTasksByUser } from "../../../api/taskApi";

const TasksList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await getTasksByUser();
            if (res.success) setTasks(res.data);
        };
        fetchTasks();
    }, []);

    return (
        <div className="container mt-4">
            <h2>All Tasks</h2>
            <ul className="list-group">
                {tasks.map(task => (
                    <li key={task.id} className="list-group-item">
                        {task.title} - {task.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TasksList;

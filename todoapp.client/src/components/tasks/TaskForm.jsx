import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, initialData = {}, submitText = "Save Task" }) => {
    const [title, setTitle] = useState(initialData.title || "");
    const [description, setDescription] = useState(initialData.description || "");
    const [dueDate, setDueDate] = useState(initialData.dueDate ? initialData.dueDate.split("T")[0] : "");

    // Agar initialData o'zgarsa, formni yangilash uchun:
    useEffect(() => {
        setTitle(initialData.title || "");
        setDescription(initialData.description || "");
        setDueDate(initialData.dueDate ? initialData.dueDate.split("T")[0] : "");
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Task title is required");
            return;
        }

        onSubmit({
            title: title.trim(),
            description: description.trim(),
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="taskTitle" className="form-label">Task Title</label>
                <input
                    type="text"
                    id="taskTitle"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="taskDescription" className="form-label">Description</label>
                <textarea
                    id="taskDescription"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional description"
                    rows={3}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="taskDueDate" className="form-label">Due Date</label>
                <input
                    type="date"
                    id="taskDueDate"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary">{submitText}</button>
        </form>
    );
};

export default TaskForm;

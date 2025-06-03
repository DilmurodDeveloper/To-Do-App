import React, { useState } from "react";

const GroupForm = ({ onSubmit, initialData = {}, submitText = "Create Group" }) => {
    const [name, setName] = useState(initialData.name || "");
    const [description, setDescription] = useState(initialData.description || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return alert("Group name is required");
        onSubmit({ name, description });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="groupName" className="form-label">Group Name</label>
                <input
                    type="text"
                    id="groupName"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter group name"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="groupDescription" className="form-label">Description</label>
                <textarea
                    id="groupDescription"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional description"
                />
            </div>
            <button type="submit" className="btn btn-primary">{submitText}</button>
        </form>
    );
};

export default GroupForm;

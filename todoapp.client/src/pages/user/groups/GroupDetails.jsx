import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getGroupById,
    addMember,
    updateGroup,
    deleteGroup
} from "../../../api/groupApi";
import { Button, Form, Modal } from "react-bootstrap";

const GroupDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newMemberEmail, setNewMemberEmail] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingName, setEditingName] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchGroup = async () => {
            setLoading(true);
            const res = await getGroupById(id);
            if (res.success) {
                setGroup(res.data);
                setEditingName(res.data.name);
                setEditingDescription(res.data.description || "");
            } else {
                alert("Failed to load group: " + res.error);
            }
            setLoading(false);
        };
        fetchGroup();
    }, [id]);

    const handleAddMember = async () => {
        if (!newMemberEmail.trim()) {
            alert("Enter a user email to add.");
            return;
        }

        // Email formatini tekshirish (oddiy regex bilan)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newMemberEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        setProcessing(true);

        // addMember funksiyasiga email yuboriladi (backend mosligini tekshiring)
        const res = await addMember(id, newMemberEmail);

        if (res.success) {
            alert("Member added!");
            setNewMemberEmail("");
            const updatedGroup = await getGroupById(id);
            if (updatedGroup.success) setGroup(updatedGroup.data);
        } else {
            alert("Error adding member: " + res.error);
        }
        setProcessing(false);
    };

    const handleDeleteGroup = async () => {
        if (!window.confirm("Are you sure to delete this group?")) return;
        setProcessing(true);
        const res = await deleteGroup(id);
        if (res.success) {
            alert("Group deleted!");
            navigate("/groups");
        } else {
            alert("Failed to delete group: " + res.error);
        }
        setProcessing(false);
    };

    const handleEditGroup = async () => {
        if (!editingName.trim()) {
            alert("Group name is required.");
            return;
        }
        setProcessing(true);
        const res = await updateGroup(id, {
            name: editingName,
            description: editingDescription,
        });
        if (res.success) {
            alert("Group updated!");
            setGroup(res.data);
            setShowEditModal(false);
        } else {
            alert("Failed to update group: " + res.error);
        }
        setProcessing(false);
    };

    if (loading) return <div>Loading...</div>;
    if (!group) return <div>Group not found.</div>;

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">{group.name}</h2>
                <div>
                    <Button
                        variant="primary"
                        onClick={() => setShowEditModal(true)}
                        disabled={processing}
                        className="me-2"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteGroup}
                        disabled={processing}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <p>{group.description || "No description"}</p>

            <h5>Members ({group.members?.length || 0})</h5>
            <ul>
                {group.members?.map((member) => (
                    <li key={member.id}>{member.username || member.id}</li>
                ))}
            </ul>

            <Form.Group className="mb-3" controlId="newMemberEmail">
                <Form.Label>Add Member by Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter user email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    disabled={processing}
                />
            </Form.Group>
            <Button onClick={handleAddMember} disabled={processing}>
                Add Member
            </Button>

            <hr />

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="editGroupName">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            disabled={processing}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editGroupDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={editingDescription}
                            onChange={(e) => setEditingDescription(e.target.value)}
                            disabled={processing}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)} disabled={processing}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditGroup} disabled={processing}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GroupDetails;

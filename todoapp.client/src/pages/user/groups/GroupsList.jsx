import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {
    createGroup,
    getGroupsCreatedByUser,
    getGroupsUserIsMemberOf,
} from "../../../api/groupApi";
import Spinner from "../../../components/common/Spinner";
import {
    Button,
    Card,
    Row,
    Col,
    Form,
    InputGroup,
    Modal,
} from "react-bootstrap";

const GroupList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [createdGroups, setCreatedGroups] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupDescription, setNewGroupDescription] = useState("");

    const userId = user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    useEffect(() => {
        const fetchGroups = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const [createdRes, joinedRes] = await Promise.all([
                    getGroupsCreatedByUser(),
                    getGroupsUserIsMemberOf(),
                ]);
                if (createdRes.success) setCreatedGroups(createdRes.data);
                if (joinedRes.success) setJoinedGroups(joinedRes.data);
            } catch (error) {
                console.error("Error fetching groups:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [userId]);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const filterGroups = (groups) => {
        if (!searchTerm.trim()) return groups;
        return groups.filter((g) =>
            g.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleCreateGroup = async () => {
        if (!newGroupName.trim()) {
            alert("Group name is required.");
            return;
        }

        setProcessing(true);
        try {
            const res = await createGroup({
                name: newGroupName,
                description: newGroupDescription,
            });

            if (res.success) {
                setCreatedGroups([...createdGroups, res.data]);
                setShowCreateModal(false);
                setNewGroupName("");
                setNewGroupDescription("");
            } else {
                alert("Failed to create group: " + res.error);
            }
        } catch (error) {
            console.error("Error creating group:", error);
            alert("Unexpected error while creating group.");
        }
        setProcessing(false);
    };

    if (loading) return <Spinner />;

    return (
        <div className="container py-5">
            <h2 className="mb-4">
                <i className="fas fa-users me-2"></i> My Groups
            </h2>

            <InputGroup className="mb-4">
                <InputGroup.Text>
                    <i className="fas fa-search"></i>
                </InputGroup.Text>
                <Form.Control
                    placeholder="Search groups..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </InputGroup>

            <Row>
                {/* Left column: Groups I Created */}
                <Col md={6} className="pe-md-4 border-end border-2">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="mb-0">
                            <i className="fas fa-user-cog me-2 text-success"></i> Groups I Created
                        </h4>
                        <Button variant="success" onClick={() => setShowCreateModal(true)}>
                            <i className="fas fa-plus me-2"></i> Create Group
                        </Button>
                    </div>
                    {filterGroups(createdGroups).length === 0 ? (
                        <p className="text-muted">You haven't created any groups yet.</p>
                    ) : (
                        filterGroups(createdGroups).map((group) => (
                            <Card key={group.id} className="mb-4 shadow">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{group.name}</Card.Title>
                                    <Card.Text className="text-muted flex-grow-1">
                                        {group.description || "No description provided."}
                                    </Card.Text>
                                    <div className="mb-3">
                                        <i className="fas fa-users me-1"></i> {group.membersCount ?? 0} members
                                    </div>
                                    <div className="d-flex justify-content-start mt-auto">
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => navigate(`/groups/${group.id}`)}
                                        >
                                            <i className="fas fa-eye me-2"></i> View
                                        </Button>
                                        {/* Edit va Delete tugmalari olib tashlandi */}
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </Col>

                {/* Right column: Groups I'm a Member Of */}
                <Col md={6} className="ps-md-4">
                    <h4 className="mb-3">
                        <i className="fas fa-user-friends me-2 text-info"></i> Groups I'm a Member Of
                    </h4>
                    {filterGroups(joinedGroups).length === 0 ? (
                        <p className="text-muted">You haven't joined any groups yet.</p>
                    ) : (
                        filterGroups(joinedGroups).map((group) => (
                            <Card key={group.id} className="mb-4 shadow">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{group.name}</Card.Title>
                                    <Card.Text className="text-muted flex-grow-1">
                                        {group.description || "No description provided."}
                                    </Card.Text>
                                    <div className="mb-3">
                                        <i className="fas fa-users me-1"></i> {group.membersCount ?? 0} members
                                    </div>
                                    <div className="d-flex justify-content-start mt-auto">
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => navigate(`/groups/${group.id}`)}
                                        >
                                            <i className="fas fa-eye me-2"></i> View
                                        </Button>
                                        {/* Leave tugmasi olib tashlandi */}
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </Col>
            </Row>

            {/* Create Group Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fas fa-plus-circle text-success me-2"></i>
                        Create New Group
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                placeholder="Enter group name"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description (optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newGroupDescription}
                                onChange={(e) => setNewGroupDescription(e.target.value)}
                                placeholder="Group description"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)} disabled={processing}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleCreateGroup} disabled={processing}>
                        {processing ? (
                            <>
                                <i className="fas fa-spinner fa-spin me-2"></i> Creating...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-check me-2"></i> Create
                            </>
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GroupList;

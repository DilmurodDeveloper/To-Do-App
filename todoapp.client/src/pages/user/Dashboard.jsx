import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getTasksByUser } from "../../api/taskApi";
import {
    getGroupsCreatedByUser,
    getGroupsUserIsMemberOf
} from "../../api/groupApi";
import Spinner from "../../components/common/Spinner";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [createdGroups, setCreatedGroups] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const userId =
        user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const [taskRes, createdGroupsRes, joinedGroupsRes] = await Promise.all([
                    getTasksByUser(userId),
                    getGroupsCreatedByUser(),
                    getGroupsUserIsMemberOf()
                ]);

                if (taskRes.success) setTasks(taskRes.data);
                if (createdGroupsRes.success) setCreatedGroups(createdGroupsRes.data);
                if (joinedGroupsRes.success) setJoinedGroups(joinedGroupsRes.data);
            } catch (error) {
                console.error("Error loading dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const chartData = [
        { name: "Tasks", value: tasks.length },
        { name: "Created Groups", value: createdGroups.length },
        { name: "Joined Groups", value: joinedGroups.length }
    ];

    const COLORS = ["#007bff", "#28a745", "#17a2b8"];

    if (loading) return <Spinner />;

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-5 fw-bold">
                    Hi, {user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User"} <i className="fas fa-hand-wave"></i>
                </h1>
                <p className="text-muted">Welcome to your personal dashboard</p>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    <i className="fas fa-chart-pie me-2"></i> View Summary
                </Button>
            </div>

            <Row className="g-4">
                <Col md={4}>
                    <Card className="shadow h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>
                                <i className="fas fa-tasks me-2"></i> My Tasks
                            </Card.Title>
                            <Card.Text className="text-muted">
                                Total: <strong>{tasks.length}</strong>
                            </Card.Text>
                            <ul className="list-unstyled small">
                                {tasks.slice(0, 3).map((task) => (
                                    <li key={task.id}>
                                        <i className="fas fa-check-circle me-1 text-success"></i>
                                        {task.title}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                onClick={() => navigate("/user/tasks")}
                                variant="outline-primary"
                                className="mt-auto"
                            >
                                <i className="fas fa-clipboard-list me-2"></i> Manage Tasks
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>
                                <i className="fas fa-users-cog me-2"></i> Created Groups
                            </Card.Title>
                            <Card.Text className="text-muted">
                                Total: <strong>{createdGroups.length}</strong>
                            </Card.Text>
                            <ul className="list-unstyled small">
                                {createdGroups.slice(0, 3).map((group) => (
                                    <li key={group.id}>
                                        <i className="fas fa-user-plus me-1 text-success"></i>
                                        {group.name}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                onClick={() => navigate("/user/groups")}
                                variant="outline-success"
                                className="mt-auto"
                            >
                                <i className="fas fa-users me-2"></i> View Groups
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>
                                <i className="fas fa-user-friends me-2"></i> Joined Groups
                            </Card.Title>
                            <Card.Text className="text-muted">
                                Total: <strong>{joinedGroups.length}</strong>
                            </Card.Text>
                            <ul className="list-unstyled small">
                                {joinedGroups.slice(0, 3).map((group) => (
                                    <li key={group.id}>
                                        <i className="fas fa-users me-1 text-info"></i>
                                        {group.name}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                onClick={() => navigate("/user/groups")}
                                variant="outline-info"
                                className="mt-auto"
                            >
                                <i className="fas fa-door-open me-2"></i> See Memberships
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fas fa-chart-pie me-2"></i> Overview Chart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Dashboard;

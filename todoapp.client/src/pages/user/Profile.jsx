import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getUserProfile, updateUserProfile } from "../../api/userApi";
import Spinner from "../../components/common/Spinner";
import { Modal, Button, Form } from "react-bootstrap";

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await getUserProfile();
                if (res.success) {
                    setProfile(res.data);
                    setFormData(res.data.userInfo);
                } else {
                    console.error("❌ Profile load failed", res.error);
                    navigate("/auth");
                }
            } catch (error) {
                console.error("❌ Exception while loading profile:", error);
                navigate("/auth");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
            };

            const res = await updateUserProfile(updatedData);
            if (res.success) {
                setProfile(res.data);
                setFormData(res.data);
                setShowModal(false);
            } else {
                alert("❌ Profile update failed: " + res.error);
            }
        } catch (error) {
            alert("❌ Unexpected error during update");
            console.error(error);
        }
    };

    if (loading) return <Spinner />;
    if (!profile) return <p className="text-danger text-center">Could not load profile</p>;

    return (
        <div className="container py-5">
            <div className="card shadow border-0">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="card-title">My Profile</h3>
                        <div className="d-flex">
                            <Button variant="outline-primary" onClick={() => setShowModal(true)} className="me-2">
                                <i className="fa fa-edit me-1" aria-hidden="true"></i> Edit
                            </Button>
                            <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                                <i className="fa fa-arrow-left me-1" aria-hidden="true"></i> Back
                            </Button>
                        </div>
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <i className="fa fa-id-badge me-2 text-secondary" aria-hidden="true"></i>
                            <strong>Username:</strong> {profile?.userInfo?.userName}
                        </li>
                        <li className="list-group-item">
                            <i className="fa fa-user me-2 text-secondary" aria-hidden="true"></i>
                            <strong>Full Name:</strong> {profile?.userInfo?.firstName} {profile?.userInfo?.lastName}
                        </li>
                        <li className="list-group-item">
                            <i className="fa fa-envelope me-2 text-secondary" aria-hidden="true"></i>
                            <strong>Email:</strong> {profile?.userInfo?.email}
                        </li>
                        <li className="list-group-item">
                            <i className="fa fa-phone me-2 text-secondary" aria-hidden="true"></i>
                            <strong>Phone:</strong> {profile?.userInfo?.phoneNumber || "Noma'lum"}
                        </li>
                    </ul>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fa fa-edit me-2" aria-hidden="true"></i>
                        Edit Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>
                                <i className="fa fa-id-badge me-2" aria-hidden="true"></i>
                                Username
                            </Form.Label>
                            <Form.Control
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>
                                <i className="fa fa-user me-2" aria-hidden="true"></i>
                                First Name
                            </Form.Label>
                            <Form.Control
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>
                                <i className="fa fa-user me-2" aria-hidden="true"></i>
                                Last Name
                            </Form.Label>
                            <Form.Control
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>
                                <i className="fa fa-envelope me-2" aria-hidden="true"></i>
                                Email
                            </Form.Label>
                            <Form.Control
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>
                                <i className="fa fa-phone me-2" aria-hidden="true"></i>
                                Phone
                            </Form.Label>
                            <Form.Control
                                name="phoneNumber"
                                value={formData.phoneNumber || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Profile;

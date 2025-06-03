import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getUserProfile } from "../../api/userApi";
import Spinner from "../../components/common/Spinner";
import Navbar from "../../Navbar";

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
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

    if (loading) return <Spinner />;
    if (!profile) return <p className="text-danger text-center">Could not load profile</p>;

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="card shadow border-0">
                    <div className="card-body">
                        <h3 className="card-title mb-4">My Profile</h3>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Username:</strong> {profile?.userInfo?.userName}
                            </li>
                            <li className="list-group-item">
                                <strong>Full Name:</strong> {profile?.userInfo ? `${profile.userInfo.firstName} ${profile.userInfo.lastName}` : "Noma'lum"}
                            </li>
                            <li className="list-group-item">
                                <strong>Email:</strong> {profile?.userInfo?.email}
                            </li>
                            <li className="list-group-item">
                                <strong>Phone:</strong> {profile?.userInfo?.phoneNumber || "Noma'lum"}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

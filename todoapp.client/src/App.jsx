import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./Footer";
import Auth from "./pages/auth/Auth";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import UserGroupsList from "./pages/user/groups/GroupsList";
import GroupDetails from "./pages/user/groups/GroupDetails";
import UserTasksList from "./pages/user/tasks/TasksList";
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersList from "./pages/admin/users/UsersList";
import UserDetails from "./pages/admin/users/UserDetails";
import GroupsList from "./pages/admin/groups/GroupsList";
import AdminGroupDetails from "./pages/admin/groups/GroupDetails";
import TasksList from "./pages/admin/tasks/TasksList";
import TaskDetails from "./pages/admin/tasks/TaskDetails";
import AdminUserGroupsList from "./pages/admin/userGroups/UserGroupsList";
import RequireAuth from "./contexts/RequireAuth";
import Navbar from "./Navbar";

const App = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                    <Route path="/auth/reset-password" element={<ResetPassword />} />
                    <Route path="/user/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                    <Route path="/user/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                    <Route path="/user/groups" element={<RequireAuth><UserGroupsList /></RequireAuth>} />
                    <Route path="/user/groups/:groupId" element={<RequireAuth><GroupDetails /></RequireAuth>} />
                    <Route path="/user/tasks" element={<RequireAuth><UserTasksList /></RequireAuth>} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<RequireAuth><UsersList /></RequireAuth>} />
                    <Route path="/admin/users/:userId" element={<RequireAuth><UserDetails /></RequireAuth>} />
                    <Route path="/admin/groups" element={<RequireAuth><GroupsList /></RequireAuth>} />
                    <Route path="/admin/groups/:groupId" element={<RequireAuth><AdminGroupDetails /></RequireAuth>} />
                    <Route path="/admin/tasks" element={<RequireAuth><TasksList /></RequireAuth>} />
                    <Route path="/admin/tasks/:taskId" element={<RequireAuth><TaskDetails /></RequireAuth>} />
                    <Route path="/admin/user-groups" element={<RequireAuth><AdminUserGroupsList /></RequireAuth>} />
                    <Route path="/groups/:id" element={<GroupDetails />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;

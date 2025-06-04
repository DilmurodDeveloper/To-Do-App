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
import AdminUsersList from "./pages/admin/users/UsersList";
import AdminUserDetails from "./pages/admin/users/UserDetails";
import AdminGroupsList from "./pages/admin/groups/GroupsList";
import AdminGroupDetails from "./pages/admin/groups/GroupDetails";
import AdminTasksList from "./pages/admin/tasks/TasksList";
import AdminTaskDetails from "./pages/admin/tasks/TaskDetails";
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
                    <Route path="/admin/users" element={<RequireAuth><AdminUsersList /></RequireAuth>} />
                    <Route path="/admin/users/:userId" element={<RequireAuth><AdminUserDetails /></RequireAuth>} />
                    <Route path="/admin/groups" element={<RequireAuth><AdminGroupsList /></RequireAuth>} />
                    <Route path="/admin/groups/:groupId" element={<RequireAuth><AdminGroupDetails /></RequireAuth>} />
                    <Route path="/admin/tasks" element={<RequireAuth><AdminTasksList /></RequireAuth>} />
                    <Route path="/admin/tasks/:taskId" element={<RequireAuth><AdminTaskDetails /></RequireAuth>} />
                    <Route path="/admin/user-groups" element={<RequireAuth><AdminUserGroupsList /></RequireAuth>} />
                    <Route path="/groups/:id" element={<GroupDetails />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;

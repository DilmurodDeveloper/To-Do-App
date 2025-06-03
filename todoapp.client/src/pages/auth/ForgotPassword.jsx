import { useState } from "react";
import { forgotPassword } from "../../api/authApi";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await forgotPassword(email);
        if (res.success) {
            setMessage("Reset link sent to your email.");
        } else {
            setMessage(res.error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Send Reset Link</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
}

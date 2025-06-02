import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onSubmit, onRegisterClick }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const handleLoginSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleLoginSubmit)} className="mb-3">
                <div className="mb-3">
                    <label htmlFor="userNameOrEmail" className="form-label">
                        <i className="fas fa-user me-2"></i>
                        Email or Username
                    </label>
                    <input
                        id="userNameOrEmail"
                        {...register("userNameOrEmail", { required: "This field is required" })}
                        className={`form-control ${errors.userNameOrEmail ? "is-invalid" : ""}`}
                        placeholder="Enter email or username"
                    />
                    {errors.userNameOrEmail && (
                        <div className="invalid-feedback">{errors.userNameOrEmail.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        <i className="fas fa-lock me-2"></i>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Minimum 6 characters" },
                        })}
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Enter password"
                    />
                    {errors.password && (
                        <div className="invalid-feedback">{errors.password.message}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login
                </button>
            </form>

            <div className="text-center mt-3">
                <span>Don't have an account? </span>
                <span
                    type="button"
                    onClick={onRegisterClick}
                    className="btn btn-link text-primary p-1"
                    style={{ fontWeight: "bold" }}
                >
                    Register
                </span>
            </div>
        </>
    );
};

export default LoginForm;

import React from "react";
import { useForm } from "react-hook-form";

const RegisterForm = ({ onSubmit, onLoginClick }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("Password");

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
                <div className="d-flex gap-3 mb-3">
                    <div className="flex-grow-1">
                        <label htmlFor="UserName" className="form-label">Username</label>
                        <input
                            id="UserName"
                            {...register("UserName", {
                                required: "Username is required",
                                maxLength: { value: 50, message: "Username cannot be longer than 50 characters." },
                            })}
                            className={`form-control ${errors.UserName ? "is-invalid" : ""}`}
                            placeholder="Enter username"
                        />
                        {errors.UserName && <div className="invalid-feedback">{errors.UserName.message}</div>}
                    </div>

                    <div className="flex-grow-1">
                        <label htmlFor="FirstName" className="form-label">First Name</label>
                        <input
                            id="FirstName"
                            {...register("FirstName", {
                                required: "First name is required",
                                maxLength: { value: 50, message: "First name cannot be longer than 50 characters." },
                            })}
                            className={`form-control ${errors.FirstName ? "is-invalid" : ""}`}
                            placeholder="Enter first name"
                        />
                        {errors.FirstName && <div className="invalid-feedback">{errors.FirstName.message}</div>}
                    </div>

                    <div className="flex-grow-1">
                        <label htmlFor="LastName" className="form-label">Last Name</label>
                        <input
                            id="LastName"
                            {...register("LastName", {
                                required: "Last name is required",
                                maxLength: { value: 50, message: "Last name cannot be longer than 50 characters." },
                            })}
                            className={`form-control ${errors.LastName ? "is-invalid" : ""}`}
                            placeholder="Enter last name"
                        />
                        {errors.LastName && <div className="invalid-feedback">{errors.LastName.message}</div>}
                    </div>
                </div>

                <div className="d-flex gap-3 mb-3">
                    <div className="flex-grow-1">
                        <label htmlFor="PhoneNumber" className="form-label">Phone Number (optional)</label>
                        <input
                            id="PhoneNumber"
                            type="tel"
                            {...register("PhoneNumber", {
                                pattern: {
                                    value: /^\+?[0-9]{10,15}$/,
                                    message: "Invalid phone number format",
                                },
                            })}
                            className={`form-control ${errors.PhoneNumber ? "is-invalid" : ""}`}
                            placeholder="+998901234567"
                        />
                        {errors.PhoneNumber && <div className="invalid-feedback">{errors.PhoneNumber.message}</div>}
                    </div>

                    <div className="flex-grow-1">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input
                            id="Email"
                            type="email"
                            {...register("Email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/, message: "Invalid email address format" },
                            })}
                            className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                            placeholder="Enter email"
                        />
                        {errors.Email && <div className="invalid-feedback">{errors.Email.message}</div>}
                    </div>
                </div>

                <div className="d-flex gap-3 mb-3">
                    <div className="flex-grow-1">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input
                            id="Password"
                            type="password"
                            {...register("Password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters." },
                            })}
                            className={`form-control ${errors.Password ? "is-invalid" : ""}`}
                            placeholder="Enter password"
                        />
                        {errors.Password && <div className="invalid-feedback">{errors.Password.message}</div>}
                    </div>

                    <div className="flex-grow-1">
                        <label htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
                        <input
                            id="ConfirmPassword"
                            type="password"
                            {...register("ConfirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value) => value === password || "Passwords do not match.",
                            })}
                            className={`form-control ${errors.ConfirmPassword ? "is-invalid" : ""}`}
                            placeholder="Re-enter password"
                        />
                        {errors.ConfirmPassword && <div className="invalid-feedback">{errors.ConfirmPassword.message}</div>}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Register
                </button>
            </form>

            <div className="text-center mt-3">
                <span>Do you have an account? </span>
                <button
                    type="button"
                    onClick={onLoginClick}
                    className="btn btn-link text-primary p-0"
                    style={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}
                >
                    Login
                </button>
            </div>
        </>
    );
};

export default RegisterForm;

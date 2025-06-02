import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StepCircleProgress from "../common/StepCircleProgress";
import "../../../public/css/App.css";  

const RegisterForm = ({ onSubmit, onLoginClick }) => {
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = useForm();

    const password = watch("Password");

    const nextStep = async () => {
        const valid = await trigger();
        if (valid) setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    return (
        <div>
            <StepCircleProgress step={step} />

            <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
                {step === 1 && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="UserName" className="form-label">
                                <i className="fas fa-user me-2"></i>Username
                            </label>
                            <input
                                id="UserName"
                                {...register("UserName", {
                                    required: "Username is required",
                                    maxLength: { value: 50, message: "Max 50 characters" },
                                })}
                                className={`form-control ${errors.UserName ? "is-invalid" : ""}`}
                                placeholder="Enter username"
                            />
                            {errors.UserName && (
                                <div className="invalid-feedback">{errors.UserName.message}</div>
                            )}
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="FirstName" className="form-label">
                                    <i className="fas fa-user me-2"></i>First Name
                                </label>
                                <input
                                    id="FirstName"
                                    {...register("FirstName", {
                                        required: "First name is required",
                                        maxLength: { value: 50, message: "Max 50 characters" },
                                    })}
                                    className={`form-control ${errors.FirstName ? "is-invalid" : ""}`}
                                    placeholder="Enter first name"
                                />
                                {errors.FirstName && (
                                    <div className="invalid-feedback">{errors.FirstName.message}</div>
                                )}
                            </div>

                            <div className="col">
                                <label htmlFor="LastName" className="form-label">
                                    <i className="fas fa-user me-2"></i>Last Name
                                </label>
                                <input
                                    id="LastName"
                                    {...register("LastName", {
                                        required: "Last name is required",
                                        maxLength: { value: 50, message: "Max 50 characters" },
                                    })}
                                    className={`form-control ${errors.LastName ? "is-invalid" : ""}`}
                                    placeholder="Enter last name"
                                />
                                {errors.LastName && (
                                    <div className="invalid-feedback">{errors.LastName.message}</div>
                                )}
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary w-100" onClick={nextStep}>
                            Next
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="PhoneNumber" className="form-label">
                                <i className="fas fa-phone me-2"></i>Phone Number (optional)
                            </label>
                            <input
                                id="PhoneNumber"
                                type="tel"
                                {...register("PhoneNumber", {
                                    pattern: {
                                        value: /^\+?[0-9]{10,15}$/,
                                        message: "Invalid phone number",
                                    },
                                })}
                                className={`form-control ${errors.PhoneNumber ? "is-invalid" : ""}`}
                                placeholder="+998901234567"
                            />
                            {errors.PhoneNumber && (
                                <div className="invalid-feedback">{errors.PhoneNumber.message}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                <i className="fas fa-envelope me-2"></i>Email
                            </label>
                            <input
                                id="Email"
                                type="email"
                                {...register("Email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/,
                                        message: "Invalid email format",
                                    },
                                })}
                                className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                                placeholder="Enter email"
                            />
                            {errors.Email && (
                                <div className="invalid-feedback">{errors.Email.message}</div>
                            )}
                        </div>

                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                Back
                            </button>
                            <button type="button" className="btn btn-primary" onClick={nextStep}>
                                Next
                            </button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                <i className="fas fa-lock me-2"></i>Password
                            </label>
                            <input
                                id="Password"
                                type="password"
                                {...register("Password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters",
                                    },
                                })}
                                className={`form-control ${errors.Password ? "is-invalid" : ""}`}
                                placeholder="Enter password"
                            />
                            {errors.Password && (
                                <div className="invalid-feedback">{errors.Password.message}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ConfirmPassword" className="form-label">
                                <i className="fas fa-lock me-2"></i>Confirm Password
                            </label>
                            <input
                                id="ConfirmPassword"
                                type="password"
                                {...register("ConfirmPassword", {
                                    required: "Confirm password is required",
                                    validate: (value) => value === password || "Passwords do not match",
                                })}
                                className={`form-control ${errors.ConfirmPassword ? "is-invalid" : ""}`}
                                placeholder="Re-enter password"
                            />
                            {errors.ConfirmPassword && (
                                <div className="invalid-feedback">{errors.ConfirmPassword.message}</div>
                            )}
                        </div>

                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                Back
                            </button>
                            <button type="submit" className="btn btn-success">
                                <i className="fas fa-user-plus me-2"></i>Register
                            </button>
                        </div>
                    </>
                )}
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
        </div>
    );
};

export default RegisterForm;

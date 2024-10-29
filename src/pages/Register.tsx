/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";
import { IRegisterForm } from "../types/user";
import { ApiRegisterUser } from "../api/apiUser";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const Register = () => {

    const [formData, setFormData] = useState<IRegisterForm>({
        userName: "",
        email: "",
        password: ""
    });

    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<Partial<IRegisterForm & { confirmPassword: string }>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const formErrors: Partial<IRegisterForm & { confirmPassword: string }> = {};

        if (!formData.userName.trim()) {
            formErrors.userName = "Username is required";
        } else if (formData.userName.length < 3) {
            formErrors.userName = "Username must be at least 3 characters long";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters long";
        }

        if (formData.password !== confirmPassword) {
            formErrors.confirmPassword = "Password do not match";
        }

        return formErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            setLoading(true);
            try {
                const response = await ApiRegisterUser(formData);
                console.log("Registration Successful:", response);
                toast.success("Register successfully!", { position: "top-center", autoClose: 1000, onClose: () => navigate("/login") });
            } catch (error: any) {
                if (error.response) {
                    const message = error.response.data.message;
                    toast.error(message, { position: "top-center", autoClose: 1000 });
                } else {
                    console.error("Unexpected Error:", error.message);
                }
            } finally {
                setErrors(validateForm());
                setLoading(false); // Stop loading

            }
        } else {
            setErrors(formErrors);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="addUser">
            <h3>Register</h3>
            <form className="addUserForm" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        autoComplete="off"
                        placeholder="Enter your name"
                        className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                    {errors.userName && (
                        <div className="invalid-feedback">
                            {errors.userName}
                        </div>
                    )}

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter your Email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                    )}

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter Password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="off"
                        placeholder="Confirm Password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}

                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? <CircularProgress size={25} style={{ 'color': 'yellow' }} /> : "Sign Up"}
                    </button>
                </div>
            </form>

            <div className="login">
                <p>Already have an Account?</p>
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Register;

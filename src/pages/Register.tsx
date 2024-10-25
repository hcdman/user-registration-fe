import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";
import { IRegisterForm } from "../types/user";

const Register = () => {

    const [formData, setFormData] = useState<IRegisterForm>({
        userName: "",
        email: "",
        password: ""
    });

    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<Partial<IRegisterForm & { confirmPassword: string }>>({});

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
            formErrors.confirmPassword = "Passwords do not match";
        }

        return formErrors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            console.log("Form Submitted!", formData);
            // Make API call here to register the user
        } else {
            setErrors(formErrors);
        }
    };

    // Handle input change for form data
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="addUser">
            <h3>Register</h3>
            <form className="addUserForm" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="userName">User Name</label>
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
                    {
                        errors.email && (<div className="invalid-feedback">{errors.email}</div>)
                    }

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
                    {
                        errors.password && (<div className="invalid-feedback">{errors.password}</div>)
                    }

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
                    {
                        errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)
                    }

                    <button type="submit" className="btn btn-success">
                        Sign Up
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"
import { useState } from "react";
import { ILoginForm } from "../types/user";
import { ApiLoginUser } from "../api/apiUser";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
const Login = () => {
    const [formData, setFormData] = useState<ILoginForm>({
        userName: "",
        password: ""
    });
    const [errors, setErrors] = useState<Partial<ILoginForm>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const validateForm = () => {
        const formErrors: Partial<ILoginForm> = {};
        if (!formData.userName.trim()) {
            formErrors.userName = "Username is required";
        } else if (formData.userName.length < 3) {
            formErrors.userName = "Username must be at least 3 characters long";
        }
        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters long";
        }
        return formErrors;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            setLoading(true);
            try {
                const response = await ApiLoginUser(formData);
                console.log("Login Successful:", response);
                toast.success("Login sucessfully !", { position: "top-center", autoClose: 1000, onClose: () => navigate("/home") })
            } catch (error: any) {
                if (error.response) {
                    const message = error.response.data.message;
                    toast.error(message, { position: "top-center", autoClose: 1000 });
                } else {
                    console.error('Unexpected Error:', error.message);
                }
            }
            finally {
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
            <h3>Sign in</h3>
            <form className="addUserForm" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="email">Username</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        autoComplete="off"
                        placeholder="Enter your username"
                        className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                    {errors.userName && (
                        <div className="invalid-feedback">
                            {errors.userName}
                        </div>
                    )}
                    <label htmlFor="Password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter your Password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {
                        errors.password && (<div className="invalid-feedback">{errors.password}</div>)
                    }
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <CircularProgress size={25} style={{ 'color': 'yellow' }} /> : "Login"}
                    </button>
                </div>
            </form>
            <div className="login">
                <p>Don't have Account? </p>
                <Link to="/register" type="submit" className="btn btn-success">
                    Register
                </Link>
            </div>
        </div>
    );
}
export default Login;
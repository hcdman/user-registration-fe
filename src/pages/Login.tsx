/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ILoginForm } from "../types/user";
import { ApiLoginUser } from "../api/apiUser";
import { toast } from "react-toastify";
import { CircularProgress, TextField, Button, Box, InputAdornment, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css"
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = () => {
    const [formData, setFormData] = useState<ILoginForm>({
        userName: "",
        password: ""
    });
    const [errors, setErrors] = useState<Partial<ILoginForm>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState<boolean>(false);
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
                login(response.data);
                toast.success("Login successfully!", { position: "top-center", autoClose: 800, onClose: () => navigate("/home") });
            } catch (error: any) {
                if (error.response) {
                    const message = error.response.data.message;
                    toast.error(message, { position: "top-center", autoClose: 1000 });
                } else {
                    console.error('Unexpected Error:', error.message);
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
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <Box className="addUser" sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <h3>Sign in</h3>
            <form className="addUserForm" onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        error={!!errors.userName}
                        helperText={errors.userName}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading ? <CircularProgress size={25} style={{ color: 'white' }} /> : "Login"}
                </Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <p>Don't have an Account?</p>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="success">
                        Register
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Login;

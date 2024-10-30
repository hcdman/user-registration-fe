/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress, Box, InputAdornment, IconButton } from "@mui/material";
import { IRegisterForm } from "../types/user";
import { ApiRegisterUser } from "../api/apiUser";
import { toast } from "react-toastify";
import "../styles/register.css"
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Register = () => {
    const [formData, setFormData] = useState<IRegisterForm>({
        userName: "",
        email: "",
        password: ""
    });
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<Partial<IRegisterForm & { confirmPassword: string }>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
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
            formErrors.confirmPassword = "Passwords do not match";
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
                toast.success("Registered successfully!", { position: "top-center", autoClose: 1000, onClose: () => navigate("/login") });
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
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    };
    return (
        <Box className="addUser" sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
            <h3>Register</h3>
            <form className="addUserForm" onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    id="userName"
                    name="userName"
                    autoComplete="off"
                    placeholder="Enter your name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.userName)}
                    helperText={errors.userName}
                    value={formData.userName}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Enter your Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Enter Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    value={formData.password}
                    onChange={handleInputChange}
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
                <TextField
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="off"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={25} style={{ color: 'white' }} /> : "Sign Up"}
                </Button>
            </form>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <p>Already have an Account?</p>
                <Link to="/login" >
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Register;

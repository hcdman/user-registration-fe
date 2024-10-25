import { Link } from "react-router-dom";
import "../styles/login.css"
const Login = () => {
    return (
        <div className="addUser">
            <h3>Sign in</h3>
            <form className="addUserForm">
                <div className="inputGroup">
                    <label htmlFor="email">User Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="off"
                        placeholder="Enter your name"
                        className="form-control"
                    />
                    <label htmlFor="Password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter your Password"
                        className="form-control"
                    />
                    <button type="submit" className="btn btn-primary">
                        Login
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
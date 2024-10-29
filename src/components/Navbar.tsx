import { Navbar as NavbarBs, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css'; // import the CSS file

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <NavbarBs sticky="top" className="shadow-sm mb-3" bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to={"/home"} as={NavLink} className="custom-nav-link">
                        Home
                    </Nav.Link>
                    {user ? (
                        <Nav.Link to={"/login"} as={NavLink} className="custom-nav-link">
                            <button onClick={logout} style={{ background: 'none', border: 'none', color: 'inherit' }}>
                                Sign out
                            </button>
                        </Nav.Link>
                    ) : (
                        <>
                            <Nav.Link to={"/register"} as={NavLink} className="custom-nav-link">
                                Register
                            </Nav.Link>
                            <Nav.Link to={"/login"} as={NavLink} className="custom-nav-link">
                                Login
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </NavbarBs>
    );
}

export default Navbar;

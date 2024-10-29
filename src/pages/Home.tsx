import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import "../styles/home.css"
const Home = () => {
    const { user } = useAuth();
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <div className="text-center">
                {user ? <h1>Wishing you a wonderful day ahead, {user.userName}!</h1> : <h1>Please login to see the content !</h1>}
            </div>
        </Container>
    );
};

export default Home;

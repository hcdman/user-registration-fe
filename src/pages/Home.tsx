import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import "../styles/home.css"
import { format } from 'date-fns';
const Home = () => {
    const { user } = useAuth();
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <div className="text-center">
                {user ? <div> <h1>Wishing you a wonderful day ahead, {user.userName}!</h1>
                    <p style={{ fontStyle: "italic" }}>Your created this account at <b>{format(user.createdAt, "MMMM do, yyyy")}</b> with email <b>{user.email}</b></p></div> : <h1>Please login to see the content !</h1>}
            </div>
        </Container>
    );
};

export default Home;

import logo from './margeAndHomer.webp';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import HomePagePublic from "./components/HomePagePublic";

function App() {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />{' '}
                        Simpson Memes La
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <HomePagePublic/>
        </>
    );
}

export default App;

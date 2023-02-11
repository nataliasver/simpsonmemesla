import logo from './lisa_coffee.jpg';
import Pages from "./components/Pages"
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {useState} from "react";
import {useEffect} from "react";
import Button from "react-bootstrap/Button";
import axios from 'axios';

const apiUrl = process.env.API_URL;

function AdminMemes() {
    const [pageNavbar, setPageNavbar] = useState("");
    const [isLogin, setIsLogin] = useState(false)

    function logout(){
        axios.delete(apiUrl+'/api/users/logout')
            .then(() => {
                setPageNavbar("login");
                setIsLogin(false);
            })
    }
    function handleLogin(){
        setPageNavbar("upload");
        setIsLogin(true)
    }
    function hanldleLogoutOnEror(){
        setPageNavbar("login");
        setIsLogin(false);
    }

  return(
      <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={"/adminmemesla"}>
            <img
                alt=""
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
            />{' '}
            Simpson Memes LA - ADMIN
          </Navbar.Brand>
            {isLogin &&
                <Nav className="me-auto">
                <Nav.Link onClick={() => setPageNavbar("upload")}>Upload</Nav.Link>
                <Nav.Link onClick={() => setPageNavbar("search")}>Buscar</Nav.Link>
            </Nav>
            }
            {isLogin && <Button variant="secondary" onClick={logout}>Logout</Button>}
        </Container>
      </Navbar>
      <Pages pageNavbar={pageNavbar} onLogin={handleLogin} onLogoutError={hanldleLogoutOnEror}/>
      </>
  );
}

export default AdminMemes;

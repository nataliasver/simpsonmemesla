import logo from './lisa_coffee.jpg';
import Pages from "./components/Pages"
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {useState} from "react";
import {useEffect} from "react";


function AdminMemes() {
    const [pageNavbar, setPageNavbar] = useState("search");

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
            <Nav className="me-auto">
                <Nav.Link onClick={() => setPageNavbar("upload")}>Upload</Nav.Link>
                <Nav.Link onClick={() => setPageNavbar("search")}>Buscar</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
      <Pages pageNavbar={pageNavbar}/>
      </>
  );
}

export default AdminMemes;

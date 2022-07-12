import React from "react";
import axios from "axios";
import Promise from "bluebird"
import {useState, useEffect} from "react";
import _ from "lodash"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('')

    function handleLogin(e) {
        e.preventDefault();
        axios.post('/api/users/login', {
            email: email,
            password: password
        })
            .then(() => props.onlogin())
            .catch(e => e.response && setMsg(e.response.data.msg));
    }

    return (
        <>
            {msg && <Alert variant='danger'>
                {msg}
            </Alert>}

            <div className="d-flex justify-content-center m-3">
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email"
                                  placeholder="Ingresa tu email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        </>
    );
}

export default Login;
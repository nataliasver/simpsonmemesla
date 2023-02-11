import React from "react";
import axios from "axios";
import Promise from "bluebird"
import {useState, useEffect} from "react";
import _ from "lodash"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert";
const apiUrl = process.env.REACT_APP_API_URL;
function SearchMeme(props) {

    const [typeOfSearch, setTypeOfSearch] = useState(props.defaultSearch)
    const [toSearch, setToSearch] = useState("")
    const [validated, setValidated] = useState(false);
    const [noMemes, setNoMemes] = useState(false);

    function handleSearch(evt) {
        const form = evt.currentTarget;
        if (form.checkValidity() === false) {
            evt.preventDefault();
            evt.stopPropagation();
            setValidated(true)
            return;
        }
        evt.preventDefault()
        console.log("pasa pro aca")
        axios.get(apiUrl+`/memes/${typeOfSearch}`, {params: {value: toSearch}})
            .then(response => {
                _.isEmpty(response.data)? setNoMemes(true) : setNoMemes(false);
                props.onMemesReceive(response.data)
            })
            .then(() =>  setValidated(false));
    }
    useEffect(() => {
            setNoMemes(false)
    }
    ,[typeOfSearch, toSearch]);

    return (
        <>
            <div>
                <Form noValidate validated={validated}  onSubmit={handleSearch}  className="container d-flex justify-content-center mt-3" >
                    <Row className="w-100 mb-3">
                    <Form.Group className="col-2">
                        <Form.Select onChange={(event) => setTypeOfSearch(event.target.value)}>
                            {props.admin && <option value="id">Id</option>}
                            <option value="title">Titulo</option>
                            <option value="season">Temporada</option>
                            <option value="episode">Episodio</option>
                            <option value="character">Personaje</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group className="col-8">
                            {(typeOfSearch == 'character' || typeOfSearch == 'title' || typeOfSearch == 'id') &&
                                <Form.Control required type="text" onChange={(event) => setToSearch(event.target.value)}
                                               id="typeOfSearch" placeholder={"Ingerese un " + typeOfSearch}/>}
                            {(typeOfSearch == 'season' || typeOfSearch == 'episode') &&
                                <Form.Control required type="number"
                                              onChange={(event) => setToSearch(event.target.value)} id="typeOfSearch"
                                              placeholder={"Ingerese un " + typeOfSearch}/>}
                            <Form.Control.Feedback type="invalid">
                                Ingresa un valor de busqueda valido!
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col-2 justify-content-center">
                            <Button variant="secondary" type="submit">
                                Buscar
                            </Button>
                                </Form.Group>
                    </Row>
                </Form>
                {noMemes &&
                    <div className='d-flex justify-content-center m-3'>
                        <Alert className="w-50 align-self-center" variant='secondary'>
                            No se encontraron memes con ese {typeOfSearch}
                        </Alert>
                    </div>
                }
            </div>

        </>
);
}

export default SearchMeme;
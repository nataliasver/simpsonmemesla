import React from "react";
import axios from "axios";
import Promise from "bluebird"
import {useState, useEffect} from "react";
import _ from "lodash"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchMeme(props) {

    const [typeOfSearch, setTypeOfSearch] = useState(props.defaultSearch)
    const [toSearch, setToSearch] = useState("")

    function handleSearch(evt) {
        evt.preventDefault()
        const formData = new FormData();
        formData.append(typeOfSearch, toSearch)
        axios.get(`/api/memes/${typeOfSearch}`, {params: {value: toSearch}})
            .then(response => props.onMemesReceive(response.data))
    }

    return(
        <>
            <div className="d-flex justify-content-center mt-3">
            <Form className="w-75" onSubmit={handleSearch}>
            <Form.Group className="d-flex justify-content-around">
                <Form.Select onChange={(event) => setTypeOfSearch(event.target.value)} className="w-25">
                    <option value="title">Titulo (proximamente)</option>
                    <option value="episode">Episodio (proximamente)</option>
                    <option value="character">Personaje (proximamente)</option>
                    {props.admin && <option value="id">Id</option>}
                </Form.Select>
                <Form.Control type="text" onChange={(event) => setToSearch(event.target.value)} id="typeOfSearch" placeholder={"Ingerese un "+typeOfSearch}/>
                <Button variant="secondary" type="submit">
                    Buscar
                </Button>
            </Form.Group>
            </Form>
            </div>

        </>
    );
}

export default SearchMeme;
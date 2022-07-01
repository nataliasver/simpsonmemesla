import React from "react";
import axios from "axios";
import Promise from "bluebird"
import {useState, useEffect} from "react";
import _ from "lodash"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchMeme() {

    const [typeOfSearch, setTypeOfSearch] = useState("id")
    const [values, setValues] = useState({
        title: "",
        season: "",
        episode: "",
        description: "",
        characters: [],
        meme_img_ulr: "memes/uploads/no_image.jpg"
    });
    const [toSearch, setToSearch] = useState("")

    function handleSearch(evt) {
        evt.preventDefault()
        const formData = new FormData();
        formData.append(typeOfSearch, toSearch)
        console.log(toSearch)
        console.log(typeOfSearch)
        console.log(formData)
        axios.get(`/api/memes/${typeOfSearch}`, {params: {value: toSearch}})
            .then(meme => console.log(meme))
        //setValues(newValues);
    }

    return(
        <>
            <p>Buscar Meme</p>
            <div className="d-flex justify-content-center">
            <Form className="w-75" onSubmit={handleSearch}>
            <Form.Group className="d-flex justify-content-around mr-5 mb-3">
                <Form.Select onChange={(event) => setTypeOfSearch(event.target.value)} className="w-25">
                    <option value="id">Id</option>
                    <option value="title" disabled>Titulo (proximamente)</option>
                    <option value="episode" disabled>Episodio (proximamente)</option>
                    <option value="character"disabled>Personaje (proximamente)</option>
                </Form.Select>
                <Form.Control type="text" onChange={(event) => setToSearch(event.target.value)} id="typeOfSearch" placeholder={"Ingerese un "+typeOfSearch}/>
                <Button variant="primary" type="submit">
                    Buscar
                </Button>
            </Form.Group>
            </Form>
            </div>

        </>
    );
}

export default SearchMeme;
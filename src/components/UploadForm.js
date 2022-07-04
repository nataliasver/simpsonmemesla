import React from "react";
import axios from "axios";
import Promise from "bluebird"
import {useState, useEffect} from "react";
import _ from "lodash"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'

function UploadForm() {
    const [memes, setMemes] = useState(null);
    const [file, setFile]= useState(null);
    const [preview, setPreview] = useState("no_image.jpg");

    useEffect(() => {
        if (file == null) return;
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file]);

    const [values, setValues] = useState({
        title: "",
        season: "",
        episode: "",
        description: "",
        characters: []
    });

   function handleSubmit(evt) {
        evt.preventDefault();
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.append("file", file);
        console.log(Object.fromEntries(formData))
        const headers = {
            "Content-Type": "multipart/form-data"
        }
        return axios.post("/api/upload/meme", formData, headers);
    }
    function handleChange(evt) {
        const { target } = evt;
        const { name, value } = target;
        const fixedValue = (name == "characters") ? _(value).split(",").value() : value
        const newValues = {
            ...values,
            [name]: fixedValue,
        };
        setValues(newValues);
    }

    function handleFileChange(event) {
        const newFile = event.target.files[0] || null;
        console.log(newFile);
        setFile(newFile);
    }

    return(
        <>
            <div className="d-flex justify-content-center m-3">
            <Form className="w-75" onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control
                            type="text" name="title" value={values.title} onChange={handleChange}
                            placeholder="Ingrese titulo del meme"/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridSeason">
                        <Form.Label>Temporada</Form.Label>
                        <Form.Control type="number" name="season" value={values.season} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEpisode">
                        <Form.Label>Episodio</Form.Label>
                        <Form.Control type="number" name="episode" value={values.episode} onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} className="mb-3" controlId="formGridEpisode">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" type="text" name="description" value={values.description} onChange={handleChange}
                                  placeholder="Ingrese descripcion del meme"/>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formGridEpisode">
                    <Form.Label>Personajes</Form.Label>
                    <Form.Control as="textarea" type="text" name="characters" value={values.characters} onChange={handleChange}
                    placeholder="Ingrese nombres de personajes separados por comas"/>
                </Form.Group>

            </Row>

                <Row className="mb-3">
                <Form.Group controlId="formFileMeme" className="mb-3 w-50">
                    <Form.Label>Meme</Form.Label>
                    <Form.Control type="file" size="sm" id="uploaded_file" name="uploaded_file" onChange={handleFileChange} />
                </Form.Group>
                    <Form.Group className="w-50" controlId="fromMemePreview">
                    <Image src={preview} style={{width: 400, height: 250 }} alt="preview del meme a subir"/>
                    </Form.Group>
                    </Row>
                <Button variant="secondary" type="submit">
                    Upload meme
                </Button>
            </Form>
            </div>

        </>
    );
}

export default UploadForm;
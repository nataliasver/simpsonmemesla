import React from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"
import fileDownload from "js-file-download";
import axios from "axios";
import {useEffect, useState} from "react";
import UploadForm from "./UploadForm";
import ExandableBodyCard from "./ExandableBodyCard";
import Row from "react-bootstrap/Row";

function ListAllMemes(props) {
    const memes = props.memes
    const handleDownload = (url, filename) => {
        axios.get(url, { responseType: "blob"})
            .then((res) => fileDownload(res.data, filename));
    };
    const [show, setShow] = useState(false);
    const [memeId, setMemeId] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (modalMemeId) => {
        setMemeId(modalMemeId)
        setShow(true);
    }
    const handleDelete = () => {
        const headers = {
            "Authorization": `Bearer ${props.token}`
        }
        props.axiosJWT.delete("/api/memes/id",{params: {value: memeId}, headers})
            .then(() => setShow(false));
    }

    const [showEdit, setShowEdit] = useState(false);
    const [memeEdit, setMemeEdit] = useState(null);
    const [fileEdit, setFileEdit] = useState(null);
    const handleCloseEdit = () => {
        setShowEdit(false);
    }
    const handleShowEdit = (memeEditShow) => {
        setMemeEdit(memeEditShow);
        setShowEdit(true);
    }
    const handleEdit = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        Object.entries(memeEdit).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append("file", fileEdit);
        console.log(Object.fromEntries(formData))
        console.log(props.token)
        const headers = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${props.token}`
        }
        return props.axiosJWT.put("/api/memes/update/meme",formData, headers)
            .then(() => setShowEdit(false));
    }
    const handleOnEditMeme = (updatedMeme) => {
        setMemeEdit(updatedMeme)
    }
    const handleOnEditFile = (file) => {
        setFileEdit(file)
    }

    return (
        <>
            {memes && <div className="container mt-2 d-flex justify-content-center">
                <Row>
                    {memes && memes.map(meme => {
                        return (
                            <Card key={meme.meme_id} style={{height: 35+ "rem"}} className="col-12 col-md-6 col-xl-4">
                                <Card.Img variant="top" style={{height: 18 + "rem"}} src={meme.meme_img_url}/>
                                <Card.Body>
                                    <Card.Title>{meme.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Temporada {meme.season} -
                                        Episodio {meme.episode}</Card.Subtitle>
                                    <ExandableBodyCard maxHeight={60}>{meme.description}</ExandableBodyCard>
                                    <Button variant="light" onClick={() => {handleDownload(meme.meme_img_url, meme.season+'_'+meme.episode+"_"+meme.title)}}>
                                        <img src="../download.svg" alt=""/>
                                    </Button>
                                    {props.admin && <Button variant="light" onClick={() => handleShowEdit(meme)}> Editar </Button>}
                                    {props.admin && <Button variant="danger" onClick={() => handleShow(meme.meme_id)}> Eliminar </Button>}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
            </div>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar meme</Modal.Title>
                </Modal.Header>
                <Modal.Body>Estas seguro que deseas eliminar este meme? {memeId}</Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        ELIMINAR
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal  size="lg" show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar meme</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <UploadForm meme={memeEdit} mode={"edit"} onEditMeme={handleOnEditMeme} onEditFile={handleOnEditFile}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Subir Cambios
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default ListAllMemes;
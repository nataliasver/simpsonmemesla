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
import _ from "lodash";
import Toast from "react-bootstrap/Toast";

function ListAllMemes(props) {
    const memes = props.memes

    const handleDownload = (url, filename) => {
        const urlFixed = _.replace('http', 'https', url);
        const urlSplit = _.split(url, '.')
        const extension =  urlSplit[urlSplit.length - 1]
        let filenameFixed = _.replace(filename,',','');
        filenameFixed = _.replace(filenameFixed,'!','');
        filenameFixed = _.replace(filenameFixed,'?','');
        filenameFixed = _.replace(filenameFixed,/ /g, '_');
        axios.get(urlFixed, { responseType: "blob"})
            .then((res) => fileDownload(res.data, filenameFixed +'.'+extension));
    };

    const [show, setShow] = useState(false);
    const [memeId, setMemeId] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (modalMemeId) => {
        setMemeId(modalMemeId)
        setShow(true);
    }
    const handleDelete = () => {
        setIsLoading(true)
        const headers = {
            "Authorization": `Bearer ${props.token}`
        }
        props.axiosJWT.delete("/api/memes/id",{params: {value: memeId}, headers})
            .then(() => {
                setIsLoading(false)
                setShow(false)
                const msg = `Se ha eliminado el meme correctamente!`
                props.onChangeMeme(msg)
            })
            .catch(e =>  {
                setIsLoading(false)
                setShow(false)
                const msg = `Ha habido un problema con update del meme: ${e}`
                props.onChangeMeme(msg);
            })

    }

    const [showEdit, setShowEdit] = useState(false);
    const [memeEdit, setMemeEdit] = useState(null);
    const [fileEdit, setFileEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCloseEdit = () => {
        setShowEdit(false);
    }
    const handleShowEdit = (memeEditShow) => {
        setMemeEdit(memeEditShow);
        setShowEdit(true);
    }
    const handleEdit = (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        Object.entries(memeEdit).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append("file", fileEdit);
        const headers = {
            "Authorization": `Bearer ${props.token}`,
            "Content-Type": "multipart/form-data"
        }
        props.axiosJWT.put("/api/memes/update/meme",formData, { headers })
            .then(() => {
                setShowEdit(false)
                setIsLoading(false);
                const msg = `Se ha actualizado el meme correctamente!`
                props.onChangeMeme(msg)
            })
            .catch(e => {
                setShowEdit(false)
                setIsLoading(false);
                const msg = `Ha habido un problema con update del meme: ${e}`
                props.onChangeMeme(msg)
            });
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
                <Row className="w-100">
                    {memes && memes.map(meme => {
                        return (
                            <Card key={meme.meme_id} style={{height: 35+ "rem"}} className="col-12 col-sm-12 col-md-4 col-lg-4">
                                <Card.Img variant="top" style={{height: 18 + "rem"}} src={meme.meme_img_url}/>
                                <Card.Body>
                                    <Card.Title>{meme.title}</Card.Title>
                                    {props.admin && <Card.Subtitle className="mb-2 text-muted">ID: {meme.meme_id}</Card.Subtitle>}
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
                    <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? 'Updating…' : 'Eliminar'}
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
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleEdit} disabled={isLoading}>
                        {isLoading ? 'Updating…' : 'Update Meme'}
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default ListAllMemes;
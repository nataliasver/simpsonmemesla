import React from "react";
import _ from "lodash"
import Card from 'react-bootstrap/Card';
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
import SearchMeme from "./SearchMeme";

import {useEffect, useState} from "react";
import axios from "axios";
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function HomePagePublic(props) {
    const [isLoading, setIsLoading] = useState(true);

    const [memes, setMemes] = useState(null)

    useEffect(() =>{
        axios.get("/api/memes")
            .catch(e => console.log("Fallo re mal: ",e))
            .then(res => {
                console.log(res.data)
                setMemes(res.data)
            })
    },[])


    function handleFetchingData() {
        setIsLoading(true);
    }

    function handleMemesReceived(memesReceived) {
        setMemes(memesReceived);
    }

    return(
        <>
            <SearchMeme onMemesReceive={handleMemesReceived} admin={false} defaultSearch="title"/>
            { memes && <CardGroup className="m-5 d-flex justify-content-center">
                    {memes && memes.map(meme => {
                    return (
                        <Col xs={12} md={4} lg={3}>
                        <Card key={meme.meme_id}>
                            <Card.Img variant="top" style={{ height: 18 +"em"}} src={_.trim(_.get(meme,"meme_img_url"),"public/")} />
                            <Card.Body>
                                <Card.Title>{_.get(meme, "title")}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Temporada {_.get(meme, "season")} - Episodio {_.get(meme, "episode")}</Card.Subtitle>
                                <Card.Text> {_.get(meme, "description")}</Card.Text>
                                <Button href={_.trim(_.get(meme,"meme_img_url"),"public/")} variant="light" download>
                                    <img src="download.svg" alt=""/>
                                </Button>
                            </Card.Body>
                        </Card>
                        </Col>
                    );
                })}
            </CardGroup> }
        </>
    );
}

export default HomePagePublic;
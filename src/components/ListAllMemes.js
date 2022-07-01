import React from "react";
import _ from "lodash"
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";

function ListAllMemes(props) {
    return(
        <>
            <CardGroup className="m-5 d-flex justify-content-center">
            {props.memes.map(meme => {
                return (
                    <Card key={meme.meme_id}>
                        <Card.Img variant="top" style={{ height: 18 +"em"}} src={_.trim(_.get(meme,"meme_img_url"),"public/")} />
                        <Card.Body>
                            <Card.Title>{_.get(meme, "title")}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Temporada {_.get(meme, "season")} - Episodio {_.get(meme, "episode")}</Card.Subtitle>
                            <Card.Text> {_.get(meme, "description")}</Card.Text>
                            <Button variant="primary">Aca iria a editar (pending)</Button>
                        </Card.Body>
                    </Card>
            );
            })}
                </CardGroup>
        </>
    );
}

export default ListAllMemes;
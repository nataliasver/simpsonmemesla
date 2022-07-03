import React from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";


function ListAllMemes(props) {
    const memes = props.memes
    return (
        <>
            {memes && <CardGroup className="m-5 d-flex justify-content-center">
                {memes && memes.map(meme => {
                    return (
                            <Col key={meme.meme_id} xs={12} md={4} lg={3}>
                                <Card>
                                    <Card.Img variant="top" style={{height: 18 + "em"}} src={meme.meme_img_url}/>
                                    <Card.Body>
                                        <Card.Title>{meme.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Temporada {meme.season} -
                                            Episodio {meme.episode}</Card.Subtitle>
                                        <Card.Text> {meme.description}</Card.Text>
                                        <Button href={meme.meme_img_url} variant="light" download>
                                            <img src="../download.svg" alt=""/>
                                        </Button>
                                        {props.admin && <Button variant="light"> Editar </Button>}
                                        {props.admin && <Button variant="danger"> Eliminar </Button>}
                                    </Card.Body>
                                </Card>
                            </Col>
                    );
                })}
            </CardGroup>}
        </>
    );
}

export default ListAllMemes;
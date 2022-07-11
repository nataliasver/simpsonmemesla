import React from "react";
import _ from "lodash"
import SearchMeme from "./SearchMeme";
import {useEffect, useState} from "react";
import ListAllMemes from "./ListAllMemes";
import Alert from "react-bootstrap/Alert";


function HomePageAdmin(props) {
    const [memes, setMemes] = useState(null)
    const [noresult, setNoResult] = useState(false);

    function handleMemesReceived(memesReceived) {
        if(!memesReceived || _.isEmpty(memesReceived)){
            setMemes(null);
            setNoResult(true);
            return;
        }
        setNoResult(false);
        setMemes(memesReceived);
    }

    return(
        <>
            <SearchMeme onMemesReceive={handleMemesReceived} admin={true} defaultSearch="id"/>
            { memes && <ListAllMemes memes={memes} admin={true} axiosJWT={props.axiosJWT} token={props.token}/>}
            { !memes && !noresult &&
            <div className='d-flex justify-content-center m-3'>
                <Alert className="w-50 align-self-center" variant='secondary'>
                Buscar un meme para editar/eliminar =)
                </Alert>
            </div>
            }
        </>
    );
}

export default HomePageAdmin;
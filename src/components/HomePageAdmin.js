import React from "react";
import _ from "lodash"
import SearchMeme from "./SearchMeme";
import {useEffect, useState} from "react";
import ListAllMemes from "./ListAllMemes";
import Alert from "react-bootstrap/Alert";


function HomePageAdmin(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [memes, setMemes] = useState(null)
    const [noresult, setNoResult] = useState(false);

    function handleFetchingData() {
        setIsLoading(true);
    }

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
            { memes && <ListAllMemes memes={memes} admin={true}/>}
            { !memes && !noresult &&
            <div className='d-flex justify-content-center m-3'>
                <Alert className="w-50 align-self-center" variant='secondary'>
                Buscar un meme para editar/eliminar =)
                </Alert>
            </div>
            }
            {noresult &&
                <div className='d-flex justify-content-center m-3'>
                    <Alert className="w-50 align-self-center" variant='secondary'>
                        No se encontraron memes! =(
                    </Alert>
                </div>
            }
        </>
    );
}

export default HomePageAdmin;
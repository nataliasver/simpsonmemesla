import React from "react";
import _ from "lodash"
import SearchMeme from "./SearchMeme";
import {useEffect, useState} from "react";
import ListAllMemes from "./ListAllMemes";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";


function HomePageAdmin(props) {
    const [memes, setMemes] = useState(null)
    const [noresult, setNoResult] = useState(false);
    const [msgMeme, setMsgMeme] = useState('');
    const [showToastMsg, setShowToastMsg] = useState(false);

    function handleMemesReceived(memesReceived) {
        if(!memesReceived || _.isEmpty(memesReceived)){
            setMemes(null);
            setNoResult(true);
            return;
        }
        setNoResult(false);
        setMemes(memesReceived);
    }
    function handleChangeMeme(msg){
        setMsgMeme(msg)
        setShowToastMsg(true);
        setMemes(null);
        setNoResult(false);
    }

    return(
        <>
            <SearchMeme onMemesReceive={handleMemesReceived} admin={true} defaultSearch="id"/>
            { memes && <ListAllMemes onChangeMeme={(msg) => handleChangeMeme(msg)} memes={memes} admin={true} axiosJWT={props.axiosJWT} token={props.token}/>}
            <div className="d-flex justify-content-center m-3 position-relative">
                <Toast position="middle-center" className="p-3" onClose={() => setShowToastMsg(false)} show={showToastMsg} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Operacion sobre Meme</strong>
                    </Toast.Header>
                    <Toast.Body>{msgMeme}</Toast.Body>
                </Toast>
            </div>
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
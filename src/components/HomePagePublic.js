import React from "react";
import SearchMeme from "./SearchMeme";
import {useEffect, useState} from "react";
import axios from "axios";
import ListAllMemes from "./ListAllMemes";
const apiUrl = process.env.REACT_APP_API_URL;
function HomePagePublic(props) {
    const [memes, setMemes] = useState(null)

    useEffect(() =>{
        axios.get(apiUrl+"/memes/memes")
            .catch(e => console.log("Fallo la carga de memes ",e))
            .then(res => {
                setMemes(res.data)
            })
    },[])


    function handleMemesReceived(memesReceived) {
        setMemes(memesReceived);
    }

    return(
        <>
            <SearchMeme onMemesReceive={handleMemesReceived} admin={false} defaultSearch="title"/>
            {memes && <ListAllMemes memes={memes} admin={false}/>}
        </>

        );
}

export default HomePagePublic;
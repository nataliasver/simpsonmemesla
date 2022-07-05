import React from "react";
import SearchMeme from "./SearchMeme";
import {useEffect, useState} from "react";
import axios from "axios";
import ListAllMemes from "./ListAllMemes";

function HomePagePublic(props) {
    const [memes, setMemes] = useState(null)

    useEffect(() =>{
        axios.get("/api/memes")
            .catch(e => console.log("Fallo re mal: ",e))
            .then(res => {
                console.log(res.data)
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
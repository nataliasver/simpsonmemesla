import React from "react";
import {useState, useEffect} from "react";
import UploadForm from "./UploadForm";
import ListAllMemesAdmin from "./ListAllMemesAdmin";
import axios from "axios";
import Promise from "bluebird";
import SearchMeme from "./SearchMeme";


function Pages(props) {
    const [page, setPage] = useState("");
    const [memes, setMemes] = useState([])

    useEffect(() =>{
       setPage(props.pageNavbar)
    },[props.pageNavbar])

    useEffect(() =>{
        axios.get("/api/memes")
            .catch(e => console.log("Fallo re mal: ",e))
            .then(res => setMemes(res.data))
            .then(() => setPage("listall"))
    },[])

    return(
        <>
                {page == "upload" && <UploadForm/>}
                {page == "edit" && <p>editar (proximamente)</p>}
                {page == "search" && <SearchMeme/>}
                {page == "listall" && <ListAllMemesAdmin memes={memes}/>}
        </>
    );
}

export default Pages;
import React from "react";
import {useState, useEffect} from "react";
import UploadForm from "./UploadForm";
import ListAllMemes from "./ListAllMemes";
import axios from "axios";
import Promise from "bluebird";
import SearchMeme from "./SearchMeme";


function Pages() {
    const [page, setPage] = useState("upload");
    const [memes, setMemes] = useState([{title: "sarlanga"}])

    function listAllMemes(e) {
        e.preventDefault()
        axios.get("/api/memes")
            .catch(e => console.log("Fallo re mal: ",e))
            .then(res => setMemes(res.data))
            .then(() => setPage("listall"))
    }

    return(
        <>
        <div>
            <button onClick={listAllMemes}>List All Memes</button>
            <button onClick={() => setPage("search")}>Search</button>
            <button onClick={() => setPage("upload")}>Upload</button>
            <button onClick={() => setPage("edit")}>Edit</button>
        </div>
            <div>
                {page == "upload" && <UploadForm/>}
                {page == "edit" && <p>editar (proximamente)</p>}
                {page == "search" && <SearchMeme/>}
                {page == "listall" && <ListAllMemes memes={memes}/>}
            </div>

        </>
    );
}

export default Pages;
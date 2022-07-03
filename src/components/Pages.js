import React from "react";
import {useState, useEffect} from "react";
import UploadForm from "./UploadForm";
import HomePageAdmin from "./HomePageAdmin";
import axios from "axios";
import Promise from "bluebird";
import SearchMeme from "./SearchMeme";


function Pages(props) {
    const [page, setPage] = useState("");
    const [memes, setMemes] = useState([])

    useEffect(() =>{
       setPage(props.pageNavbar)
    },[props.pageNavbar])

    return(
        <>
                {page == "upload" && <UploadForm/>}
                {page == "search" && <HomePageAdmin memes={memes}/>}
        </>
    );
}

export default Pages;
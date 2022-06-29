import React from "react";
import {useState, useEffect} from "react";
import UploadForm from "./UploadForm";

function Pages() {
    const [page, setPage] = useState("upload");

    return(
        <>
        <div>
            <button onClick={() => setPage("listall")}>List All Memes</button>
            <button onClick={() => setPage("search")}>Search</button>
            <button onClick={() => setPage("upload")}>Upload</button>
            <button onClick={() => setPage("edit")}>Edit</button>
        </div>
            <div>
                {page == "upload" && <UploadForm/>}
                {page == "edit" && <p>editar (proximamente)</p>}
                {page == "search" && <p>Buscar memes (proximamente)</p>}
                {page == "listall" && <p>Ver todos los memes (proximamente)</p>}
            </div>

        </>
    );
}

export default Pages;
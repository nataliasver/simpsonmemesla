import React from "react";
import axios from "axios";
import Promise from "bluebird"
import {useState, useEffect} from "react";
import _ from "lodash"

function UploadForm() {
    const [memes, setMemes] = useState(null);
    const [file, setFile]= useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (file == null) return;
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file]);

    const [values, setValues] = useState({
        title: "",
        season: "",
        episode: "",
        description: "",
        characters: []
    });

   function handleSubmit(evt) {
        evt.preventDefault();
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.append("file", file);
        console.log(Object.fromEntries(formData))
        const headers = {
            "Content-Type": "multipart/form-data"
        }
        return axios.post("/api/upload/meme", formData, headers);
    }
    function handleChange(evt) {
        const { target } = evt;
        const { name, value } = target;
        const fixedValue = (name == "characters") ? _(value).split(",").value() : value
        const newValues = {
            ...values,
            [name]: fixedValue,
        };
        setValues(newValues);
    }

    function handleFileChange(event) {
        const newFile = event.target.files[0] || null;
        console.log(newFile);
        setFile(newFile);
    }

    return(
        <>
            <p>Carga de nuevo meme</p>
            <form style={{ display: "flex", flexDirection: "column", alignItems: "center"}} onSubmit={handleSubmit} >
                <label htmlFor="title">Titulo</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                />
                <label htmlFor="season">Season</label>
                <input
                    id="season"
                    name="season"
                    type="number"
                    value={values.season}
                    onChange={handleChange}
                />
                <label htmlFor="episode">Episodio</label>
                <input
                    id="episode"
                    name="episode"
                    type="number"
                    value={values.episode}
                    onChange={handleChange}
                />
                <label htmlFor="description">Descripción</label>
                <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                />
                <label htmlFor="characters">Personajes</label>
                <input
                    id="characters"
                    name="characters"
                    type="text"
                    value={values.characters}
                    onChange={handleChange}
                />
                <label htmlFor="meme">Meme</label>
                <input type="file" id="uploaded_file" name="uploaded_file" onChange={handleFileChange}/>
                {
                    preview && (<img style={{width: 300, height: 200}} src={preview} />)
                }
                <button type="submit">Cargar nuevo meme</button>
            </form>

        </>
    );
}

export default UploadForm;
import React from "react";
import {useState, useEffect} from "react";
import UploadForm from "./UploadForm";
import HomePageAdmin from "./HomePageAdmin";
import Promise from "bluebird";
import Login from "./Login";
import axios from "axios";
import jwt_decode from "jwt-decode";


function Pages(props) {
    const [page, setPage] = useState("");
    const [memes, setMemes] = useState([])


    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    useEffect(() =>{
       setPage(props.pageNavbar)
    },[props.pageNavbar])

    useEffect(() => {
            refreshToken();
    }, [])

    const refreshToken = () => {
        axios.get('/api/users/token')
            .then(response => {
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
                setExpire(decoded.exp);
                props.onLogin()
            })
            .catch(error => {
                if (error.response){
                    props.onLogoutError()
                }
            })
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use((config) => {
        const currentDate = new Date();
        if (expire * 1000 > currentDate.getTime()) return Promise.resolve(config);
        return axios.get('/api/users/token')
            .then(response => {
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
                setExpire(decoded.exp);
                console.log(config)
                return config;
            })
            .catch(() => props.onLogoutError())

    }, (error) => {
        props.onLogoutError()
        return Promise.reject(error);
    });

    function handleOnLogin(){
        props.onLogin()
    }



    return(
        <>
                {page == "login" && <Login onlogin={handleOnLogin}/>}
                {page == "upload" && <UploadForm axiosJWT={axiosJWT} token={token}/>}
                {page == "search" && <HomePageAdmin memes={memes} axiosJWT={axiosJWT} token={token}/>}
        </>
    );
}

export default Pages;
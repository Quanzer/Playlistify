import React from "react";
import { Container } from "react-bootstrap";



 const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=d0a7c019553b471699c3e5f9119c08eb&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email%20streaming%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-library-read"


export default function Login(){
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
            <a className="btn btn-success btn-lg" href={AUTH_URL}>Login to spotify</a>
        </Container>
    )
}
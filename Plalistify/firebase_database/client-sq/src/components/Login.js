import React from "react"
import { Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=11ee222ab8b5473baefa2038fa09443d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  )
}
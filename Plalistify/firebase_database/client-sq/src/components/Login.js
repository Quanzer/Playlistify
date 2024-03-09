import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=11ee222ab8b5473baefa2038fa09443d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
  const history = useNavigate();

  // Function to log out from Spotify
  const handleLogout = () => {
    // Perform logout logic here
    // Example: Clear access token, remove session, etc.
    // This is specific to how you manage authentication with Spotify
    console.log("Logged out from Spotify");
  };

  // Check for code parameter in URL after redirection from Spotify
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      // Redirect to the dashboard page upon successful authentication
      history.push('/dashboard');
    }
  }, [history]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
          Login With Spotify
        </a>
        <button className="btn btn-danger btn-lg ml-2" onClick={handleLogout}>
          Logout from Spotify
        </button>
      </div>
    </Container>
  );
};

export default Login;

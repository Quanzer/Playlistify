import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from './firebaseConfig'; // Adjust the import path as necessary
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginSignup = () => {
  const navigate = useNavigate();

  // Google login logic
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <button
          type="button"
          className="btn btn-danger btn-lg mt-2"
          onClick={handleGoogleSignIn}
        >
          Login with Google
        </button>
      </div>
    </Container>
  );
};

export default LoginSignup;

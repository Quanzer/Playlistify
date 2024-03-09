import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Import getAuth, createUserWithEmailAndPassword, and signInWithEmailAndPassword
import { auth } from '../firebase/config'; // Import the auth object from config.js

const AuthPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate(); // Using useNavigate hook to get the navigate function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    const auth = getAuth(); // Get the auth object
    try {
      // Create user with email and password using the auth object
      await createUserWithEmailAndPassword(auth, email, password);
      // Set isLoggedIn to true
      setIsLoggedIn(true);
      // Redirect to the Spotify login page
      navigate('/login'); // Using navigate function to redirect
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    const auth = getAuth(); // Get the auth object
    try {
      // Sign in user with email and password using the auth object
      await signInWithEmailAndPassword(auth, email, password);
      // Set isLoggedIn to true
      setIsLoggedIn(true);
      // Redirect to the Spotify login page
      navigate('/login'); // Using navigate function to redirect
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Signup/Login Page</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleSignUp}>Sign Up</button>
        <button type="button" onClick={handleSignIn}>Login</button>
        <button type="button" onClick={handleForgotPassword}>Forgot Password</button> {/* Add this button */}
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AuthPage;

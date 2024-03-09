import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import AuthPage from './AuthPage'; // Import the AuthPage component

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUdI36Y9Bfi2Psv1SSmgW9nDGwqVJXsro",
  authDomain: "playlistify-ba03c.firebaseapp.com",
  databaseURL: "https://playlistify-ba03c-default-rtdb.firebaseio.com",
  projectId: "playlistify-ba03c",
  storageBucket: "playlistify-ba03c.appspot.com",
  messagingSenderId: "664164155510",
  appId: "1:664164155510:web:32a890f73ea3571dd89f57"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        {/* Route Setup */}
        <Routes>
          {/* Route for the initial signup/login page */}
          <Route path="/" element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} />
          {/* Route for the Spotify login page */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          {/* Route for the dashboard page */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Route for the signup page */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

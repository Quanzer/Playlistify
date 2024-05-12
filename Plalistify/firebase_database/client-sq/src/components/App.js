import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard.js';
import Admin from "./Admin"
import Authorized from "./Authorized"
import History from "./History"
import Settings from './Settings.js';
import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar"
import { Routes, Route } from "react-router-dom"
import { createContext } from 'react'
import io from 'socket.io-client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefinition from './theme';
import axios from 'axios';

export const SocketContext = createContext(io(process.env.REACT_APP_API_URL));

function App() {
  const apiSocket = useContext(SocketContext);
  const [mode, setMode] = useState(window.localStorage.getItem('theme') === null ? "light" : window.localStorage.getItem('theme'));
  const [theme, setTheme] = useState(createTheme(themeDefinition(mode)));
  const [featureFilters, setFeatureFilters] = useState({
    energy: { min: 0.0, max: 1.0 },
    instrumentalness: { min: 0.0, max: 1.0 },
    valence: { min: 0.0, max: 1.0 },
    tempo: { min: 0, max: 300 },
    explicit: true
  });
  
  useEffect(() => {
  let ignore = false;

  async function fetchFilter() {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/filter/filterFeature`);
      if (!ignore) {
        // Log the fetched data
        setFeatureFilters(result.data); 
        console.log(result.data); // Update the state with fetched data
      }
    } catch (error) {
      console.error('Error fetching filter features:', error);
      // Handle error, e.g., set default or empty filter features  
    }
  }
  

  // Call the fetchFilter function
  fetchFilter();

  // Set interval to call fetchFilter every 1 second
  const intervalId = setInterval(fetchFilter, 1000);

  // Cleanup function to clear interval on component unmount or when useEffect runs again
  return () => {
    clearInterval(intervalId);
    ignore = true; // Set ignore flag to true to ignore any pending async operations
  };
}, []);
  console.log(featureFilters);

  // Function to update the theme
  

  // Function to update the theme
  const updateTheme = (newTheme) => {
    window.localStorage.setItem("theme", newTheme);
    setMode(newTheme);
    setTheme(createTheme(themeDefinition(newTheme)));
  }

  // Function to update feature filters by making a call to the backend
  const updateFeatureFilters = (newFilters) => {
    setFeatureFilters(newFilters);

    
    }
  

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'inline-flex', width: "100%", overflow: "hidden", backgroundColor: theme.palette.background.primary, height: "100vh" }}>
        <SocketContext.Provider value={apiSocket}>
          <NavBar theme={theme} mode={mode} updateTheme={updateTheme} />
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Authorized />} />
            <Route path="/" element={<Dashboard theme={theme} mode={mode} featureFilters={featureFilters} />} />
            <Route path="/history" element={<History theme={theme} />} />
            <Route path="/settings" element={<Settings theme={theme} updateTheme={updateTheme} updateFeatureFilters={updateFeatureFilters} featureFilters={featureFilters} />} />
          </Routes>
        </SocketContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App;

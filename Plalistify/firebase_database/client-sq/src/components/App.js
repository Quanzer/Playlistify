import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard.js';
import Admin from "./Admin"
import Authorized from "./Authorized"
import History from "./History"
import Settings from "./Settings"
import React, { useState, useEffect, useContext, useMemo } from "react";
import NavBar from "./NavBar"
import { Routes, Route } from "react-router-dom"
import { createContext } from 'react'
import io from 'socket.io-client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefinition from './theme';

export const SocketContext = createContext(io(process.env.REACT_APP_API_URL));

function App() {

  const apiSocket = useContext(SocketContext);
  const [mode, setMode] = useState(window.localStorage.getItem('theme') === null ? "light" : window.localStorage.getItem('theme'));
  const theme = useMemo(() => createTheme(themeDefinition(mode)), [mode])

  useEffect(() => {

    // Event Handlers
    apiSocket.on('id', (res) => {
      console.log('ID: ', res);
    });

    return () => {
      apiSocket.off('id');
      apiSocket.disconnect();
    };
  }, [])

  // console.log(theme)

  const handleSwitch = () => {
    window.localStorage.setItem("theme", mode === "light" ? "dark" : "light")
    setMode(mode === "light" ? "dark" : "light")
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'inline-flex', width: "100%", overflow: "hidden", backgroundColor: theme.palette.background.primary, height: "100vh" }}>
        <SocketContext.Provider value={apiSocket}>
        
          <NavBar theme={theme} mode={mode}>
            
          </NavBar>
          
          <Routes>
            <Route path="/admin" element={<Admin />}>
            </Route>
            <Route path="/auth" element={<Authorized />}>
            </Route>
            <Route path="/" element={<Dashboard theme={theme} mode ={mode}/>}>
            </Route>
            <Route path="/history" element={<History theme={theme} />}>
            </Route>
            <Route path="/settings" element={<Settings theme={theme} />}>
            </Route>

            
          </Routes>
        </SocketContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App;

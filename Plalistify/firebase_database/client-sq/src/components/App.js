import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard.js';
import Login from './Login';
import io from 'socket.io-client';
import Admin from './Admin.js';
import History from "./History"
import React, { useState, useEffect, useContext, useMemo } from "react";
import { createContext } from 'react'
import { Routes, Route } from "react-router-dom"

const code = new URLSearchParams(window.location.search).get('code')

export const SocketContext = createContext(io(process.env.REACT_APP_API_URL));
function App() {
  const apiSocket = useContext(SocketContext);
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
  return (
    <>
      <SocketContext.Provider value={apiSocket}>
    
        <Routes>
            <Route path="/admin" element={<Admin />}>
            </Route>
            <Route path="/" element={<Dashboard/>}>
            </Route>
            <Route path="/history" element={<History />}>
            </Route>
          </Routes>
     
          </SocketContext.Provider>
          </>
  )

}


export default App;

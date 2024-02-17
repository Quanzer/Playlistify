import './styles/App.css';
import Login from "./Login/login"
import Dashboard from "./dashboard"
import { Routes, Route } from "react-router-dom"

const code = new URLSearchParams(window.location.search).get("code")

function App(){
    return (
        <>
        <div>
            Song queue
        </div>
        <Dashboard code = {code}/> : <Login/>        
    
        </>
        )
}

export default App
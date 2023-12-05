import React from "react";
import EmailList from "./EmailList";
import Form from "./comp/form";

const App = () => {
    return (
        
        <>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <img style={{transition:'transform .2s', width: 100, height: 100}}
                            src="OIG.jpeg" />
        <h2 style={{ color: "blue", fontWeight: "1000", fontSize: 100 * 0.0167+ 'vw' }}>Playlistify</h2>
        </div>
        <Form /> 
        <EmailList />
        </>
    )
}

export default App
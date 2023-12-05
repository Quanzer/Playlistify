import React, { useState } from "react";
import "./form.css";

const Form = () => {
        const [user, setUser] = useState(
            {
                Email: '', Password: ''
            }
        )
        let name, value
        console.log(user)
        const data = (e) =>
        {
            name = e.target.name;
            value = e.target.value;
            setUser({...user, [name]: value});
        }
        const getdata = (e) =>
        {
            const {Email, Password} = user;
            e.preventDefault();
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email, Password
                })
            }
            const res = fetch(
                'https://playlistify-ba03c-default-rtdb.firebaseio.com/UserData.json',
                options
                )
                if (res)
                {
                    alert("Updated")
                }
                else{
                    alert("Error Occurred")
                }
        }
    return (
        <>
        <div className="form">
            <div className="container">
                <form method="POST">
                    <input type="text" name="Email" placeholder="Email" value={user.Email} autoComplete="off" required onChange={data}></input>
                    <input type="text" name="Password" placeholder="Password" value={user.Password} autoComplete="off" required onChange={data}></input>
                    <button onClick={getdata}>Submit</button>
                </form>
            </div>
        </div>
        
        </>
    )
}

export default Form
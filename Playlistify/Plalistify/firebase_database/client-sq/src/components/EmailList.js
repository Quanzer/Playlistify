// EmailList.js

import React, { useState, useEffect } from "react";

const EmailList = () => {
    const [emailList, setEmailList] = useState([]);
    const [showList, setShowList] = useState(false);

    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await fetch(
                'https://playlistify-ba03c-default-rtdb.firebaseio.com/UserData.json',
                options
            );

            const data = await res.json();

            // Assuming the Firebase response is an object with user data
            // You can modify this part based on your actual Firebase structure
            const usersArray = Object.values(data);

            // Extracting emails from user data
            const emails = usersArray.map((userData) => userData.Email);

            setEmailList(emails);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleList = () => {
        fetchData(); // Refresh the email list when the button is clicked
        setShowList(!showList);
    };

    return (
        <div>
            <button onClick={toggleList}>Show Email List</button>
            {showList && (
                <>
                    <h2>Email List:</h2>
                    <ul>
                        {emailList.map((email, index) => (
                            <li key={index}>{email}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default EmailList;

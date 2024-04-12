import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MaskedInput from 'react-text-mask';
import axios from 'axios';
import * as bootstrap from 'bootstrap';

//npm install react-text-mask --save
// user can invitate guest through phone message 
// and email. also can copy the text in the textarea
// to send the guest.
const JoinParty = () => {
    const [email, setEmail] = useState('');
    const [textMessage, setTextMessage] = useState('');
    const [invitation, setInvitation] = useState('');

    const handleInvitationClick = () => {
        const invitationLink = "http://playlistfy.com/invitation"; 
        const invitationMessage = `Welcome to our music party! Please click the link below to join:\n${invitationLink}\nFeel free to share this link with your friends. We look forward to seeing you there!`;
        setInvitation(invitationMessage);
    };


    const isPhoneNumberValid = () => {
        // Check if the phone number has exactly 10 digits
        const digits = textMessage.replace(/\D/g, ''); // Remove all non-digit characters
        return digits.length === 10;
    };

    const isEmailValid = () => {

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };
    // invitate the guest through mail
    const sendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:3001/send-email', {
                to: email,
                subject: 'Welcome to Playlistfy Party',
                text: invitation
            });
    
            if (response.status === 200) {
                clearForm()
                alert(`Email successfully sent to ${email}`);
            } else {
                console.error('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email', error);
        }
    };
    // invitate guest through text message
    const sendMessage = async () => {
        try {

            const invitationCode = generateInvitationCode();
            const rawPhoneNumber = textMessage.replace(/[^\d]/g, '');
            const response = await axios.post('http://localhost:3001/send-message', {
                to: rawPhoneNumber, 
                message: 'Welcome to our Playlistfy party! Please using invitation code to join the party. ' +invitationCode, 
            });
    
            if (response.data.success) {
                clearForm();
                alert(`Message successfully sent to ${textMessage}`);
            } else {
                console.error('Failed to send message', response.data);
            }
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    const generateInvitationCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000);
        return code.toString();
    };

    const clearForm = () => {
        setEmail("");
        setTextMessage("")
    }
    useEffect(() => {
        handleInvitationClick();

        const collapseElement = document.getElementById('collapseExample');
        const collapseInstance = new bootstrap.Collapse(collapseElement, {
            toggle: true
        });
    }, []);
    return (
        <>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">

                    <div className="input-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Send guest email to this party by email"
                            aria-label="Recipient's email"
                            aria-describedby="button-addon2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <button className="btn btn-success col-2" type="button" id="button-addon2" disabled={!email.trim() || !isEmailValid()} onClick={sendEmail}>send email</button>
                    </div>

                    <div className="input-group mb-3">
                        <MaskedInput
                            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            className="form-control"
                            placeholder="Enter US phone number"
                            guide={false}
                            id="my-input-id"
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                        />
                        <button className="btn btn-success col-2" type="button" id="button-addon2"
                            disabled={!textMessage.trim() || !isPhoneNumberValid()} onClick={sendMessage}>send text message</button>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold">Copy and paste the following instruction and send to your guest</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" 
                            value={invitation} readOnly style={{ resize: 'none' }}></textarea>
                    </div>
                </div>
            </div>
        </>
    )
};

export default JoinParty;

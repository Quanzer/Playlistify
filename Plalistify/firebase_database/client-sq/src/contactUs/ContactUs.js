import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';

function ContactForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post('http://localhost:3001/send-email', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log("lalallal");
    
            if (response.status === 200) {
                console.log('Email sent successfully');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                console.log('Failed to send email');
                // Error feedback to user
            }
        } catch (error) {
            console.error('Error sending email', error);
            // Error feedback to user
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Name:</label>
                    {/* <input type="text" className="form-control" id="userName" placeholder="your name" /> */}
                    <input type="text" className="form-control" id="name" placeholder="your name" value={formData.name} onChange={handleChange}
/>
                </div>
                <div className="mb-3">
                    <label htmlFor="emailAddress" className="form-label">Email address:</label>
                    <input type="email" className="form-control" id="email" placeholder="your address" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject:</label>
                    <input type="text" className="form-control" id="subject" placeholder="" value={formData.subject} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Message:</label>
                    <textarea className="form-control" id="message" rows="3" value={formData.message} onChange={handleChange}></textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </>
    );
}

export default ContactForm;

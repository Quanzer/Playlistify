import React from 'react'
import {useState } from 'react'
import { createRoom } from './Api'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Component for creating room dialog box, accepts a personName as prop
// post the data to the databse and return model window to caller
export default function MyFunc({personId, personName, redirectTo}) {
    
    // declare all the states to record the state of each element
    const [validated, setValidated] = useState(false)
    const [capacity, setCapacity] = useState(1);
    const [roomName, setroomName] = useState('');
    const [roomType, setRoomType] = useState('public')
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('')
    const [passwordError, setPasswordError] = useState('');
    const [isRePasswordInvalid, setIsRePasswordInvalid] = useState(false);
    const navigate = useNavigate();

    // function for submit data to the database
    // and checking the validation of each textbox
    // redireact to another page if the data successfuly
    // posted to the database 
    const isValidRedirectPath = (path) => {
        return /^\/[a-zA-Z0-9-_\/]+$/.test(path)
      };
      
    const handleSubmit = async (event) => {
        event.preventDefault()
        const form = event.currentTarget

        if (roomType === 'private' && password !== rePassword) {
            setIsRePasswordInvalid(true); 
            return;
        } else {
            setIsRePasswordInvalid(false); 
        }

        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
            return 
        }

        const formData = {
            roomName: roomName,
            capacity: capacity,
            roomType: roomType,
            password: roomType === 'private' ? password : "",  
            createdBy: personName,
            PersonId: personId
        }

        if (redirectTo && isValidRedirectPath(redirectTo) && personId && personName) {
                try {
                    await createRoom(formData); 
                    navigate(redirectTo);
                    const closeButton = document.querySelector('#myModal .btn-close');
                    if (closeButton) {
                        closeButton.click();
                    }
                    setroomName('');
                    setCapacity(1);
                    setPassword('');
                    setRePassword('');
                    setValidated(false);
                } catch (error) {
                    console.error('Submit error:', error);
                }
          }else{
            alert('parameter is missing.')
          }

    };

    // switch the textbox states if user choose different room type
    const handleRoomTypeChange = (event) => {
        setRoomType(event.target.value)
        if (event.target.value === 'public') {
            setPassword(''); 
            setRePassword(''); 
            setPasswordError(''); 
            setIsRePasswordInvalid(false)
        }
    }
    const handleRoomNameChange = (event) => {
        setroomName(event.target.value)
    }
    const handleCapacityChange = (event) => {
        const value = event.target.value;
        if (value === '' || (Number(value) > 0 && Number.isInteger(Number(value)))) {
            setCapacity(value);
        }
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        if (passwordError) {
            setPasswordError(''); 
        }
    }
    const handleRePasswordChange = (event) => {
        setRePassword(event.target.value)
        if (passwordError) {
            setPasswordError(''); 
        }
    }

    // return the model window when user click on the button
    return (
        <>
        <style>{`.modal-backdrop { z-index: 0 !important; }`}</style>

        <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{
                    background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)',
                    marginTop: '20px',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 26px 58px 0px rgba(0, 0, 0, 0.22), 0px 5px 14px 0px rgba(0, 0, 0, 0.18)',
                    color: '#333',
                    fontFamily: 'Arial, sans-serif',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"  style={{
                                                                                    fontSize: '1.5rem',   
                                                                                    color: '#5a5a5a',   
                                                                                    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
                                                                                }}>Create Your Party Room</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className={`row g-3 needs-validation ${validated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Room Name</label>
                                <input type="text" className="form-control shadow " id="formGroupExampleInput2" placeholder="Give a name to your party" value={roomName} onChange={handleRoomNameChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Capacity</label>
                                <input type="number" min="1" className="form-control shadow" id="capacityInput" placeholder="Number of people allowed" value={capacity} onChange={handleCapacityChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="form-label">Password</label>
                                <input type="text" className="form-control shadow" id="passwordInput" value={password} onChange={handlePasswordChange} disabled={roomType !== 'private'} {...(roomType === 'private' ? { required: true } : {})} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rePasswordInput" className="form-label">Re-password</label>
                                <input
                                    type="text"
                                    className={`form-control shadow ${isRePasswordInvalid ? 'is-invalid' : ''}`}
                                    id="rePasswordInput"
                                    value={rePassword}
                                    onChange={handleRePasswordChange}
                                    disabled={roomType !== 'private'}
                                    {...(roomType === 'private' ? { required: true } : {})}
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">CreateBy</label>
                                <input type="text" className="form-control rounded-pill shadow" id="formGroupExampleInput2" value={personName} disabled />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="validationFormCheck2" name="radio-stacked" value="public" onChange={handleRoomTypeChange} defaultChecked />
                                        <label className="form-check-label" htmlFor="validationFormCheck2">Public Room</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="validationFormCheck3" name="radio-stacked" value="private" onChange={handleRoomTypeChange} />
                                        <label className="form-check-label" htmlFor="validationFormCheck3">Private Room</label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="col-12 btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>    
        </>
    )
}
MyFunc.propTypes = {
    personName: PropTypes.string.isRequired,
    redirectTo: PropTypes.string.isRequired,
    personId: PropTypes.number.isRequired
  }

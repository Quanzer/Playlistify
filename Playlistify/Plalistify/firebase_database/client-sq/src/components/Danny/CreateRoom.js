import React from 'react'
import {useState } from 'react'
import { createRoom } from './Api'
import { useNavigate } from 'react-router-dom';

export default function MyFunc({personName }) {
    const [validated, setValidated] = useState(false)
    const [capacity, setCapacity] = useState(1);
    const [roomName, setroomName] = useState('');
    const [roomType, setRoomType] = useState('public')
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('')
    const [passwordError, setPasswordError] = useState('');

    const [isRePasswordInvalid, setIsRePasswordInvalid] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const form = event.currentTarget

        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
            return // 如果表单验证失败，则不继续执行后面的代码
        }

        if (roomType === 'private' && password !== rePassword) {
            setIsRePasswordInvalid(true); // 设置 rePasswordInput 为无效
            return;
        } else {
            setIsRePasswordInvalid(false); // 清除 rePasswordInput 的无效状态
        }

        // 如果表单验证成功且密码匹配，可以在这里进行其他处理，例如发送表单数据
        // 数据验证通过，准备提交数据
        const formData = {
            roomName: roomName,
            capacity: capacity,
            roomType: roomType,
            password: roomType === 'private' ? password : "",  // 如果是私有房间，才需要密码
            createdBy: personName
        };

        try {
            const response = await createRoom(formData); // 使用导入的函数
            navigate('/room');
        } catch (error) {
            console.error('Submit error:', error);
        }
    };


    const handleRoomTypeChange = (event) => {
        setRoomType(event.target.value)
        if (event.target.value === 'public') {
            setPassword(''); // 重置密码
            setRePassword(''); // 重置重复密码
            setPasswordError(''); // 清除密码错误消息
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
            setPasswordError(''); // 清除密码错误消息
        }
    }

    const handleRePasswordChange = (event) => {
        setRePassword(event.target.value)
        if (passwordError) {
            setPasswordError(''); // 清除密码错误消息
        }
    }


    return (
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
                        <h5 className="modal-title" id="exampleModalLabel">Create Your Party Room</h5>
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
    )
}


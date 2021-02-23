import {useDispatch, useSelector} from 'react-redux'
import {createRoom, joinRoom} from '../../redux/actions'
import React, {useEffect, useState} from 'react'
import image from '../../assets/images/image.png'
import './HomeStyles.scss'

export const HomeComponent = () => {
    const [option, setOption] = useState(null)
    const [roomName, setRoomName] = useState('')
    const [userName, setUserName] = useState('')
    const currentRoom = useSelector((state) => state.room)
    const dispatch = useDispatch()

    console.log(currentRoom)

    useEffect(() => {
        console.log(currentRoom)
    }, [currentRoom])

    const renderOptions = () => {
        return (
            <div className='options'>
                <h2>Select one option</h2>
                <button className='btn-primary' onClick={() => setOption('create')}>Create Room</button>
                <button className='btn-primary' onClick={() => setOption('join')}>Join Room</button>
            </div>
        )
    }

    const renderForm = () => {
        return (
            <div className='form'>
                <div className="input-container">
                    <label htmlFor="roomName">* Room Name:</label>
                    <input id="roomName" type='text' placeholder='Room name'
                           value={roomName} onChange={event => setRoomName(event.target.value)}/>
                </div>

                <div className="input-container">
                    <label htmlFor="userName">* User Name:</label>
                    <input id="userName" type='text' placeholder='User name'
                           value={userName} onChange={event => setUserName(event.target.value)}/>
                </div>
            </div>
        )
    }

    const renderCreateForm = () => {
        return (
            <div className='create-form'>
                <h2>Create new room</h2>
                {renderForm()}
                <div className="buttons-container">
                    <button className="btn-secondary"
                            onClick={() => setOption(null)}>Cancel
                    </button>

                    <button className="btn-primary"
                            onClick={() => dispatch(createRoom(roomName, userName))}>Create
                    </button>
                </div>
            </div>
        )
    }

    const renderJoinForm = () => {
        return (
            <div className='join-form'>
                <h2>Join existing room</h2>
                {renderForm()}
                <div className="buttons-container">
                    <button className="btn-secondary"
                            onClick={() => setOption(null)}>Cancel
                    </button>

                    <button className="btn-primary"
                            onClick={() => dispatch(joinRoom(roomName, userName))}> Join
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='home-container'>
            <h1>Side Stacker Game</h1>
            <p>
                Two players see a board, which is a grid of 7 rows and 7 columns. They take turn adding pieces to a
                row, on one of the sides. <br/>
                The pieces stack on top of each other, and the game ends when there are no
                spaces left available, or when a player has four consecutive pieces on a diagonal, column, or row.
            </p>

            <div className="home-info">
                <img src={image} alt="Home image"/>

                <div className="home-actions">
                    {!currentRoom.name && !option ? renderOptions() : null}
                    {!currentRoom.name && option === 'create' ? renderCreateForm() : null}
                    {!currentRoom.name && option === 'join' ? renderJoinForm() : null}
                </div>
            </div>
        </div>
    )
}

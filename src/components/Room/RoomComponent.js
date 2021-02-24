import React, {useContext, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {WebSocketContext} from '../../websockets/websocket';
import {GameComponent} from "./Game/GameComponent";
import {RoomInfoComponent} from "./RoomInfo/RoomInfoComponent";
import "./RoomStyles.scss"

export const RoomComponent = () => {
    const room = useSelector(state => state.room)
    const user = useSelector(state => state.user)
    const ws = useContext(WebSocketContext)

    useEffect(() => {
        ws.connectPlayer(room.name, user)
        if (!room || !room.name) {
            window.location = '/'
        }
    }, [room, user, ws])

    const sendMessage = (message) => {
        ws.sendMessage(message)
    }

    return (
        <div className="room-container">
            {room ? <RoomInfoComponent/> : null}
            {room ? <GameComponent sendMessage={sendMessage}/> : null}
        </div>
    )
}

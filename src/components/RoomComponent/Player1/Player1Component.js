import React, {useContext, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {WebSocketContext} from '../../../websockets/websocket';
import {GameComponent} from "../Game/GameComponent";
import {RoomInfoComponent} from "../RoomInfo/RoomInfoComponent";
import "./Player1Styles.scss"

export const Player1Component = () => {
    const room = useSelector(state => state.room)
    const ws = useContext(WebSocketContext)

    useEffect(() => {
        ws.connectPlayer(room.name, 1, room.user_1)
        if (!room.user_1) window.location = '/'
    }, [])

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

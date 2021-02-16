import React, {useContext, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {WebSocketContext} from '../../../websockets/websocket';
import {GameComponent} from "../Game/GameComponent";
import {RoomInfoComponent} from "../RoomInfo/RoomInfoComponent";
import "./Player2Styles.scss"

export const Player2Component = () => {
    const room = useSelector(state => state.room)
    const ws = useContext(WebSocketContext)

    useEffect(() => {
        ws.connectPlayer(room.name, 2, room.user_2)
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

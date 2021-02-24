import React, {createContext} from 'react'
import {useDispatch} from "react-redux"
import {updateRoom} from "../redux/actions"
import {WS_URL} from "../utils/config";

const WebSocketContext = createContext(null)
export {WebSocketContext}


export default ({children}) => {
    let socket
    let ws

    const dispatch = useDispatch()

    const connectPlayer = (roomName, userName) => {
        console.log(roomName, userName)
        if (!socket) {
            socket = new WebSocket(`${WS_URL}/${roomName}/${userName}`)
        }

        socket.onmessage = function (event) {
            const payload = JSON.parse(event.data)
            console.log(payload)
            dispatch(updateRoom(payload))
        }

        socket.onclose = function (event) {
            alert('Connection not available, leaving the room')
            window.location('/')
        }
    }

    const sendMessage = (message) => {
        socket.send(JSON.stringify(message))
    }

    ws = {
        socket: socket,
        connectPlayer,
        sendMessage
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}

import React, {createContext} from 'react'
import {useDispatch} from "react-redux"
import {updateRoomBoard} from "../redux/actions"
import {WS_URL} from "../utils/config";

const WebSocketContext = createContext(null)
export {WebSocketContext}


export default ({children}) => {
    let socket
    let ws

    const dispatch = useDispatch()

    const connectPlayer = (roomName, playerNumber, userName) => {
        if (!socket) {
            socket = new WebSocket(`${WS_URL}/${roomName}/${playerNumber}/${userName}`)
        }

        socket.onmessage = function (event) {
            const payload = JSON.parse(event.data)
            console.log(typeof payload)
            dispatch(updateRoomBoard(payload))
        }

        socket.onclose = function (event) {
            console.log(event.data)
        }
    }

    const sendMessage = (message) => {
        socket.send(JSON.stringify(message))
        dispatch(updateRoomBoard(message))
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

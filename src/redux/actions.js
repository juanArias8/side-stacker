import axios from 'axios';
import {API_URL} from '../utils/config'

export const UPDATE_ROOM = 'UPDATE_ROOM'

export const updateRoom = (payload) => {
    return {
        type: UPDATE_ROOM,
        payload: payload
    }
}

export const SET_SYMBOL = 'SET_SYMBOL'

export const setSymbol = (symbol) => {
    return {
        type: SET_SYMBOL,
        payload: symbol
    }
}

export const SET_USERNAME = 'SET_USERNAME'

export const setUser = (username) => {
    return {
        type: SET_USERNAME,
        payload: username
    }
}

export const createRoom = (roomName, userName, boot) => {
    const player_2 = boot ? 'boot' : null;
    return async function (dispatch) {
        try {
            const data = {
                name: roomName,
                player_1: {name: userName},
                player_2: {name: player_2},
                next: userName,
                boot: boot
            }
            const response = await axios.post(`${API_URL}/rooms`, data)
            dispatch(updateRoom(response.data))
            dispatch(setUser(userName))
            dispatch(setSymbol('x'))
            window.location = '/#/room'
        } catch (error) {
            alert("error creating the room, try another name")
        }
    }
}

export const joinRoom = (roomName, userName) => {
    return async function (dispatch) {
        try {
            const data = {
                name: roomName,
                player_2: {name: userName}
            }
            const response = await axios.post(`${API_URL}/rooms/join`, data)
            dispatch(updateRoom(response.data))
            dispatch(setUser(userName))
            dispatch(setSymbol('o'))
            window.location = '/#/room'
        } catch (error) {
            alert("error joining the room, try another name")
        }
    }
}


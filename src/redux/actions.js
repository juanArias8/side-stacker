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

export const createRoom = (roomName, userName) => {
    return async function (dispatch) {
        try {
            const data = {
                name: roomName,
                user_1: userName
            }
            const response = await axios.post(`${API_URL}/rooms/`, data)
            console.log(response.data)
            dispatch(updateRoom(response.data))
            dispatch(setUser(response.data.user_1))
            dispatch(setSymbol('x'))
            window.location = '/#/room/1'
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
                user_2: userName
            }
            const response = await axios.post(`${API_URL}/rooms/join`, data)
            console.log(response.data)
            dispatch(updateRoom(response.data))
            dispatch(setUser(response.data.user_2))
            dispatch(setSymbol('o'))
            window.location = '/#/room/2'
        } catch (error) {
            alert("error joining the room, try another name")
        }
    }
}


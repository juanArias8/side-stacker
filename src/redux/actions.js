import axios from 'axios';
import {API_URL} from '../utils/config'

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST'
export const UPDATE_ROOM_BOARD = 'UPDATE_ROOM_BOARD'

export const updateRoomBoard = (response) => {
    console.log(response)
    return {
        type: UPDATE_ROOM_BOARD,
        payload: response.data
    }
}

export const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST'
export const UPDATE_ROOM = 'UPDATE_ROOM'
export const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR'


export const createRoomRequest = () => {
    return {
        type: CREATE_ROOM_REQUEST
    }
}

export const updateRoom = (payload) => {
    return {
        type: UPDATE_ROOM,
        payload: payload
    }
}

export const createRoomError = (error) => {
    return {
        type: CREATE_ROOM_ERROR,
        payload: error
    }
}

export const SET_SYMBOL = 'SET_SYMBOL'

export const setSymbol = (symbol) => {
    return {
        type: SET_SYMBOL,
        payload: symbol
    }
}

export const createRoom = (roomName, userName) => {
    return async function (dispatch) {
        dispatch(createRoomRequest())
        try {
            const data = {
                name: roomName,
                user_1: userName
            }
            const response = await axios.post(`${API_URL}/rooms/`, data)
            dispatch(updateRoom(response.data))
            dispatch(setUser(response.data.user_1))
            dispatch(setSymbol('x'))
            window.location = '/#/room/1'
        } catch (error) {
            alert("error creating the room, try another name")
        }
    }
}

export const JOIN_ROOM_REQUEST = 'JOIN_ROOM_REQUEST'
export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS'
export const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR'

export const joinRoomRequest = () => {
    return {
        type: JOIN_ROOM_REQUEST
    }
}

export const joinRoomSuccess = (payload) => {
    return {
        type: JOIN_ROOM_SUCCESS,
        payload: payload
    }
}


export const joinRoomError = (error) => {
    return {
        type: JOIN_ROOM_ERROR,
        payload: error
    }
}

export const joinRoom = (roomName, userName) => {
    return async function (dispatch) {
        dispatch(joinRoomRequest())
        try {
            const data = {
                name: roomName,
                user_2: userName
            }
            const response = await axios.post(`${API_URL}/rooms/join`, data)
            dispatch(updateRoom(response.data))
            dispatch(setSymbol('o'))
            dispatch(setUser(response.data.user_2))
            window.location = '/#/room/2'
        } catch (error) {
            dispatch(joinRoomError(error))
        }
    }
}

export const SET_USERNAME = 'SET_USERNAME'

export const setUser = (username) => {
    return {
        type: SET_USERNAME,
        payload: username
    }
}


export const SET_NEXT = 'SET_NEXT'

export const setNext = (username) => {
    return {
        type: SET_NEXT,
        payload: username
    }
}

import {JOIN_ROOM_SUCCESS, SET_NEXT, SET_SYMBOL, SET_USERNAME, UPDATE_ROOM, UPDATE_ROOM_BOARD} from "./actions";

const initialState = {
    room: {
        name: null,
        user_1: null,
        user_2: null,
        next: null,
        winner: null,
        board: []
    },
    user: null,
    symbol: ''
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ROOM:
            return {...state, room: action.payload}

        case SET_SYMBOL:
            return {...state, symbol: action.payload}

        case JOIN_ROOM_SUCCESS:
            return {...state, room: action.payload}

        case UPDATE_ROOM_BOARD:
            return {...state, room: action.payload}

        case SET_USERNAME:
            return {...state, user: action.payload}

        case SET_NEXT:
            return {...state, next: action.payload}

        default:
            return state
    }
}

export default chatReducer

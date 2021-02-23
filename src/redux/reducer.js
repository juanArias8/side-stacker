import {SET_SYMBOL, SET_USERNAME, UPDATE_ROOM} from "./actions";

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

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ROOM:
            return {...state, room: action.payload}

        case SET_SYMBOL:
            return {...state, symbol: action.payload}

        case SET_USERNAME:
            return {...state, user: action.payload}

        default:
            return state
    }
}

export default rootReducer

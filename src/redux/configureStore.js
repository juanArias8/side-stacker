import {applyMiddleware, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from './logger'
import chatReducer from "./reducer";


export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const composedEnhancers = compose(middlewareEnhancer)
    return createStore(chatReducer, preloadedState, composedEnhancers)
}

import {applyMiddleware, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from "./reducer";
import loggerMiddleware from './logger'

export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)
    // const middlewareEnhancer = applyMiddleware(thunkMiddleware)
    const composedEnhancers = compose(middlewareEnhancer)
    return createStore(rootReducer, preloadedState, composedEnhancers)
}

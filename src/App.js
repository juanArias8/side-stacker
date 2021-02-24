import {Provider} from "react-redux"
import WebsocketProvider from "./websockets/websocket";
import React from "react";
import configureStore from "./redux/configureStore";
import {HashRouter, Route} from 'react-router-dom'
import {HomeComponent} from "./components/Home/HomeComponent";
import {RoomComponent} from "./components/Room/RoomComponent";


const store = configureStore()

const App = () => {
    return (
        <Provider store={store}>
            <WebsocketProvider>
                <HashRouter>
                    <Route path="/" component={HomeComponent} exact/>
                    <Route path="/room" component={RoomComponent} exact/>
                </HashRouter>
            </WebsocketProvider>
        </Provider>
    )
}

export default App

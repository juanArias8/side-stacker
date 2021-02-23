import {Provider} from "react-redux"
import WebsocketProvider from "./websockets/websocket";
import React from "react";
import configureStore from "./redux/configureStore";
import {HashRouter, Route} from 'react-router-dom'
import {HomeComponent} from "./components/Home/HomeComponent";
import {Player1Component} from "./components/Room/Player1/Player1Component";
import {Player2Component} from "./components/Room/Player2/Player2Component";


const store = configureStore()

const App = () => {
    return (
        <Provider store={store}>
            <WebsocketProvider>
                <HashRouter>
                    <Route path="/" component={HomeComponent} exact/>
                    <Route path="/room/1" component={Player1Component} exact/>
                    <Route path="/room/2" component={Player2Component} exact/>
                </HashRouter>
            </WebsocketProvider>
        </Provider>
    )
}

export default App

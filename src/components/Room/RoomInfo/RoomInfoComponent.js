import React from "react";
import {useSelector} from "react-redux";
import "./RoomInfoStyles.scss"

export const RoomInfoComponent = () => {
    const room = useSelector(state => state.room)
    const symbol = useSelector(state => state.symbol)

    const handleGoBack = () => {
        window.location = '/'
    }

    return (
        <div className="room-info-container">
            <h2>Room info</h2>
            <p><b>Name:</b> {room.name}</p>
            <p><b>Player 1:</b> {room.player_1 ? room.player_1.name : ''}</p>
            <p><b>Player 2:</b> {room.player_2 ? room.player_2.name : ''}</p>
            <p><b>Symbol:</b> {symbol}</p>
            {room.next ? <p><b>Next: </b>{room.next}</p> : null}
            {room.winner ?
                <div className="winner-container">
                    <p><b>Winner: </b>{room.winner}</p>
                </div> : null
            }

            <button className="btn-primary" onClick={handleGoBack}>Go home</button>
        </div>
    )
}

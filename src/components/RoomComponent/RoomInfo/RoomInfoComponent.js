import React from "react";
import {useSelector} from "react-redux";
import "./RoomInfoStyles.scss"

export const RoomInfoComponent = () => {
    const room = useSelector(state => state.room)

    const handleGoBack = () => {
        window.location = '/'
    }

    return (
        <div className="room-info-container">
            <h2>Room info</h2>
            <p><b>Name:</b> {room.name}</p>
            <p><b>Player 1:</b> {room.user_1}</p>
            <p><b>Player 2:</b> {room.user_2}</p>

            {room.next ? <p><b>Next: </b>{room.next}</p> : null}
            {room.winner ?
                <div className="winner-container">
                    <p><b>Winner: </b>{room.winner}</p>
                </div> : null
            }

            <button className="btn-primary" onClick={handleGoBack}>Go back</button>
        </div>
    )
}

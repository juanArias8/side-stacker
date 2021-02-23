import React from "react";
import {useSelector} from "react-redux";
import "./BoardStyles.scss"

export const BoardComponent = () => {
    const room = useSelector(state => state.room)

    const getValueBackground = (value) => {
        if (value === 'x') {
            return '#1976d2'
        } else if (value === 'o') {
            return '#512da8'
        } else {
            return 'white'
        }
    }

    return (
        <div className="board-container">
            {room.board.map((rowValue, rowKey) => {
                return <div key={rowKey} className="board-row">
                    <span className="row-number">{rowKey + 1}</span>
                    {rowValue.map((columnValue, columnKey) => {
                        return <span className="value" key={columnKey}
                                     style={{'backgroundColor': getValueBackground(columnValue)}}>
                            {columnValue}
                        </span>
                    })}
                </div>
            })}
        </div>
    )
}

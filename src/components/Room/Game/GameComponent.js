import React, {useState} from "react";
import {useSelector} from "react-redux";
import {BoardComponent} from "./Board/BoardComponent";
import "./GameStyles.scss"

export const GameComponent = ({sendMessage}) => {
    const [moveRowInput, setMoveRowInput] = useState('')
    const [moveRowError, setMoveRowError] = useState('')
    const [moveSenseInput, setMoveSenseInput] = useState('')
    const [moveSenseError, setMoveSenseError] = useState('')

    const room = useSelector(state => state.room)
    const user = useSelector(state => state.user)
    const symbol = useSelector(state => state.symbol)

    const handlePlay = () => {
        const newRoom = {...room, board: getNewBoard()}
        sendMessage(newRoom)
        setMoveRowInput('')
        setMoveSenseInput('')
    }

    const setMoveRowValue = (value) => {
        value = parseInt(value)
        if (value < 1 || value > 7) {
            setMoveRowInput('')
            setMoveRowError('invalid')
        } else {
            setMoveRowInput(value)
            setMoveRowError('')
        }
    }

    const setMoveSenseValue = (value) => {
        value = value.toLowerCase()
        if (value !== 'l' && value !== 'r') {
            setMoveSenseInput('')
            setMoveSenseError('invalid')
        } else {
            setMoveSenseInput(value)
            setMoveSenseError('')
        }
    }

    const getNewBoard = () => {
        const rowIndex = parseInt(moveRowInput) - 1
        let board = [...room.board]
        let emptyIndex = null
        let addIndex = null

        if (board[rowIndex].includes(' ')) {
            addIndex = moveSenseInput === 'l' ? 0 : board.length
            emptyIndex = moveSenseInput === 'l'
                ? board[rowIndex].indexOf(' ')
                : board[rowIndex].lastIndexOf(' ')

            board[rowIndex].splice(emptyIndex, 1)
            board[rowIndex].splice(addIndex, 0, symbol)
        } else {
            alert("Row already filled")
        }

        return board
    }

    const handlePlayAgain = () => {
        const newRoom = {...room, board: [], winner: null}
        sendMessage(newRoom)
    }

    const renderForm = () => {
        return (
            <div className="board-form">
                <div className="input-container">
                    <label htmlFor="row">* Row [1-7]</label>
                    <input id="row" type='text' minLength='1' maxLength='1' value={moveRowInput}
                           onChange={event => setMoveRowValue(event.target.value)}/>
                    {moveRowError ? <small>{moveRowError}</small> : null}
                </div>

                <div className="input-container">
                    <label htmlFor="sense">* Sense l or r</label>
                    <input id="sense" type='text' minLength='1' maxLength='1' value={moveSenseInput}
                           onChange={event => setMoveSenseValue(event.target.value)}/>
                    {moveSenseError ? <small>{moveSenseError}</small> : null}
                </div>

                <div className="buttons-container">
                    {moveRowInput && moveSenseInput
                        ? <button className="btn-primary" onClick={() => handlePlay()}>Play </button>
                        : null
                    }
                </div>
            </div>
        )
    }

    const renderGameOver = () => {
        return <div className="game-over">
            <p>Game over</p>
            <button className="btn-primary" onClick={() => handlePlayAgain()}>Play again</button>
        </div>
    }

    return (
        <div className="game-container">
            <h2>Board game</h2>
            {room && room.winner ? renderGameOver() : null}
            {room && room.boot && room.player_2.name === user ? <p>Guest mode</p> : null}
            {room && room.player_1?.name && !room.player_2?.name ? <p>Waiting for player 2</p> : null}
            {room && !room.player_1?.name && room.player_2?.name ? <p>Player 1 disconnected</p> : null}
            {room && !room.winner && room.next !== user ? <p>Waiting for move</p> : null}
            {room && !room.winner && room.next === user ? renderForm() : null}
            {room && room.board ? <BoardComponent/> : null}
        </div>
    )
}

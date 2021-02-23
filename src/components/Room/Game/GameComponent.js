import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateRoom} from "../../../redux/actions";
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
    const dispatch = useDispatch()

    const sendData = () => {
        const newRoom = {...room, board: getNewBoard(), next: getNextPlayer()}
        dispatch(updateRoom(newRoom))
        sendMessage(newRoom)
    }

    const setMoveRowValue = (value) => {
        value = parseInt(value)
        if (value < 1 || moveRowInput > 7) {
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

    const getNextPlayer = () => {
        return user === room.user_1 ? room.user_2 : room.user_1
    }

    const renderForm = () => {
        return (
            <div className="board-form">
                <div className="input-container">
                    <label htmlFor="row">* Row [1-7]</label>
                    <input id="row" type='number' min='1' max='7' value={moveRowInput}
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
                        ? <button className="btn-primary" onClick={() => sendData()}>Play </button>
                        : null
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="game-container">
            <h2>Board game</h2>
            {room && room.user_1 && room.user_2 && !room.winner && room.next === user
                ? renderForm()
                : <p>Waiting for move ...</p>
            }
            {room && room.board ? <BoardComponent/> : null}
        </div>
    )
}

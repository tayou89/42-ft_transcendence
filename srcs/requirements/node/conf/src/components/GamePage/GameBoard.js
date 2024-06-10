import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import "../../css/game-page/game-board.css";

function PlayerSlot({id}) {
    return (
        <div className="col" id={id}>
            <div className="row">image</div>
            <div className="row">name</div>
            <div className="row">level</div>
        </div>
    );
}

function Board() {
    return (
        <div className="col" id="board">
            <div className="row">
                <div className="col">hello</div>
                <div className="col">hello</div>
                <div className="col">hello</div>
            </div>
        </div>
    );
}

function GameBoard() {
    return (
        <div className="row" id="game-board">
            <PlayerSlot id="player1" />
            <Board />
            <PlayerSlot id="player2" />
        </div>
    );
}

export default GameBoard;
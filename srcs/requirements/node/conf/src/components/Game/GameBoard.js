import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import PlayerSlot from "./PlayerSlot.js";
import "../../css/game/game-board.css";

function GameBoard() {
    return (
        <div className="row" id="game-board">
            <PlayerSlot id="player1" />
            <Board />
            <PlayerSlot id="player2" />
        </div>
    );
}

function Board() {
    return (
        <div className="col" id="board">
            <Ball id="ball" />
            <Paddle id="paddle1" />
            <Paddle id="paddle2" />
        </div>
    );
}

export default GameBoard;
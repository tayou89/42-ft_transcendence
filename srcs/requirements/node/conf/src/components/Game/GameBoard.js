import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import PlayerSlot from "./PlayerSlot.js";
import "../../css/game/game-board.css";

function GameBoard({ ball, paddle }) {
    return (
        <div className="row" id="game-board">
            <PlayerSlot id="player1" />
            <Board ball={ ball } paddle={ paddle }/>
            <PlayerSlot id="player2" />
        </div>
    );
}

function Board({ ball, paddle }) {
    return (
        <div className="col" id="board">
            <Ball id="ball" position={ ball } />
            <Paddle id="paddle1" position={ paddle } />
            <Paddle id="paddle2" position={ paddle }/>
        </div>
    );
}

export default GameBoard;
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import PlayerSlot from "./PlayerSlot.js";
import "../../css/game/game-board.css";

function GameBoard({ players, ball, paddle }) {
    return (
        <div className="row" id="game-board">
            <PlayerSlot id="player1" player={ players[0] }/>
            <Board ball={ ball } paddle={ paddle }/>
            <PlayerSlot id="player2" player={ players[1] }/>
        </div>
    );
}

function Board({ ball, paddle }) {
    return (
        <div className="col" id="board">
            <Ball id="ball" ball={ ball } />
            <Paddle id="paddle1" paddle={ paddle } />
            <Paddle id="paddle2" paddle={ paddle }/>
        </div>
    );
}

export default GameBoard;
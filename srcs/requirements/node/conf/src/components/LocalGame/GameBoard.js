import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import "../../css/game/game-board.css";

function GameBoard({ game }) {
    return (
        <div className="row" id="game-board">
            <Board ball={ game.ball } paddle={ game.paddle }/>
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
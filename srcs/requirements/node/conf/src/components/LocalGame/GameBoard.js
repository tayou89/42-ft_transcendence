import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import StartPopUp from "./StartPopUp.js";
import ResultPopUp from ".//ResultPopUp.js";
import "../../css/game/game-board.css";

function GameBoard({ game, setGame }) {
    return (
        <div className="row" id="game-board">
            <Board ball={ game.ball } paddle={ game.paddle }/>
            <StartPopUp game={ game } setGame={ setGame } />
            <ResultPopUp game={ game } />
        </div>
    );
}

function Board({ ball, paddle }) {
    return (
        <div className="col" id="board">
            <Ball id="ball" ball={ ball } />
            <Paddle id="paddle1" paddle={ paddle[0] } />
            <Paddle id="paddle2" paddle={ paddle[1] }/>
        </div>
    );
}

export default GameBoard;
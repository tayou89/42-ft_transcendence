import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Paddle from "./Paddle.js";
import Ball from "../RemoteGame/Ball.js";
import StartPopUp from "./StartPopUp.js";
import ResultPopUp from ".//ResultPopUp.js";
import "../../css/game/game-board.css";

function GameBoard({ game, setGame }) {
    return (
        <div className="row" id="game-board">
            <Board game={ game } />
            <StartPopUp game={ game } setGame={ setGame } />
            <ResultPopUp game={ game } />
        </div>
    );
}

function Board({ game }) {
    const ballId = game.isStarted ? "ball-spin" : "ball";

    return (
        <div className="col" id="board">
            <Ball id={ ballId } ball={ game.ball } />
            <Paddle id="paddle1" paddle={ game.paddle[0] } />
            <Paddle id="paddle2" paddle={ game.paddle[1] }/>
        </div>
    );
}

export default GameBoard;
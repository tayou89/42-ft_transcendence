import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
// import Ball from "./Ball.js";
import PaddleStyle from "./PaddleStyle.js";
import "../../css/game-page/game-board.css";
import {BOARD, PADDLE, BALL} from "./constant.js";

function PlayerSlot({id}) {
    return (
        <div className="col" id={id}>
            <div className="row">image</div>
            <div className="row">name</div>
            <div className="row">level</div>
        </div>
    );
}

function Paddle({id}) {
    const paddleStyle = new PaddleStyle(id);
    const style = paddleStyle.getStyle();

    console.log(style);
    return (
        <div id={id} style={style}></div>
    );
}

function Ball() {
    const ball = document.getElementById("ball");

    return (
        <div id="ball"></div>
    );
}

function Board() {
    return (
        <div className="col" id="board">
            <Ball />
            <Paddle id="paddle1"/>
            <Paddle id="paddle2"/>
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
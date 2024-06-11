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

function stringifyStyle(style) {
    const styleString = Object.entries(style)
        .map(([key, value]) => {
            const kebabKey = key
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .toLowerCase();
            return `${kebabKey}: ${value}`;
        })
        .join('; ');
    return styleString;
}

function Paddle({id}) {
    const paddleStyle = new PaddleStyle(id);
    const style = paddleStyle.getStyle();

    console.log(style);
    const stringStyle = stringifyStyle(style);
    console.log("string_style", stringStyle);
    return (
        <div id={id} style={stringStyle}></div>
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
import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
// import Ball from "./Ball.js";
// import Paddle from "./Paddle.js";
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

function drawPaddle(paddle){
    const style = paddle;

    style.width = `${PADDLE.WIDTH}px`;
    style.height = `${PADDLE.HEIGHT}px`;
    style.top = `${PADDLE.INITIAL_Y}px`;
    if (paddle.id === "paddle1")
    {
        style.left = `${PADDLE.OFFSET_X - (PADDLE.WIDTH / 2)}px`;
        style.background = `linear-gradient(to left, white 50%, black 100%)`
    }
    else
    {
        style.left = `${BOARD.WIDTH - (PADDLE.OFFSET_X + (PADDLE.WIDTH / 2))}px`;
        style.background = `linear-gradient(to right, white 50%, black 100%)`
    }
}

function Paddle({id}) {
    const style = {
        position: `absolute`,
        background-color: `white`,
        width: `${PADDLE.WIDTH}px`;
        height: `${PADDLE.HEIGHT}px`;
        border-radius: 3px;
        background: linear-gradient(to left, white 50%, black 100%)
    }
    };
    return (
        <div id={id}> style={style}</div>
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
            <Paddle id="paddle1"/>
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

// function Board() {
//     const [myPaddleY, setMyPaddleY] = useState(PADDLE.INITIAL_Y);

//     useEffect(() => {
//             const handleKeyDown = (event) => {
//                 const key = event.key;
//                 if (key === 'w')
//                     setMyPaddleY(myPaddleY - 1);
//                 else if (key === 's')
//                     setMyPaddleY(myPaddleY + 1);
//             };
//             document.addEventListener('keydown', handleKeyDown);
//             return (() => {
//                 document.removeEventListener('keydown', handleKeyDown);
//             });
//         }, []);
//     useEffect(() => {
//         const canvas = document.getElementById("board");
//         const ballX = PADDLE.OFFSET_X + (PADDLE.WIDTH / 2) + BALL.RADIUS;
//         const ball = new Ball(ballX, BOARD.HEIGHT / 2);
//         const myPaddle = new Paddle(1);
//         const otherPaddle = new Paddle(2);
//         myPaddle.setY(myPaddleY);
//         myPaddle.drawOnCanvas(canvas);
//         ball.drawOnCanvas(canvas);
//         otherPaddle.drawOnCanvas(canvas);
//     }, [myPaddleY]);
//     return (
//         <canvas className="col" id="board" width="700" height="440"></canvas>
//         // <div className="col" id="board">
//             // <div id='ball'></div>
//         // </div>
//     );
// }
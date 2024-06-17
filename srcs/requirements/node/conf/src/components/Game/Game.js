import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import NavigationBar from "../utility/NavigationBar.js";
import ScoreBoard from "./ScoreBoard.js";
import GameBoard from "./GameBoard.js";
import BottomLine from "./BottomLine.js";
import handleKey from "./handleKey.js";
import handleGameSocket from "./handleSocket.js";
import { INIT } from "./constant.js";
import "../../css/game/game-page.css";

function Game() {
    const [score, setScore] = useState({ p1: 0, p2: 0});
    const [ball, setBall] = useState({ x: INIT.BALL.X, y: INIT.BALL.Y }); 
    const [paddle, setPaddle] = useState({ p1: INIT.PADDLE1.Y, p2: INIT.PADDLE2.Y });
    const scoreString = JSON.stringify(score);
    const ballString = JSON.stringify(ball);
    const paddleString = JSON.stringify(paddle);
    const game = { 
        ball: ball, setBall: setBall, 
        paddle: paddle, setPaddle, setPaddle, 
        score: score, setScore: setScore
    };

    handleKey();
    handleGameSocket(game);
    return (
        <div className="container-fluid" id="game-page">
            <NavigationBar />
            <ScoreBoard scoreString={ scoreString }/>
            <GameBoard ball={ ballString } paddle={ paddleString }/>
            <BottomLine />
        </div>
    );
}

export default Game;
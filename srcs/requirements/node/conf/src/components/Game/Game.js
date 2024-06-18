import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import NavigationBar from "../utility/NavigationBar.js";
import ScoreBoard from "./ScoreBoard.js";
import GameBoard from "./GameBoard.js";
import BottomLine from "./BottomLine.js";
import handleKey from "./handleKey.js";
import handleGameSocket from "./handleSocket.js";
import { INIT } from "./constant.js";
import "../../css/game/game-page.css";

function Game({ player, socketType }) {
    console.log("player:", player);
    console.log("socketType:", socketType);
    const [score, setScore] = useState({ p1: 0, p2: 0});
    const [ball, setBall] = useState({ x: INIT.BALL.X, y: INIT.BALL.Y }); 
    const [paddle, setPaddle] = useState({ p1: INIT.PADDLE1.Y, p2: INIT.PADDLE2.Y });
    const game = { 
        ball: ball, setBall: setBall, 
        paddle: paddle, setPaddle, setPaddle, 
        score: score, setScore: setScore
    };

    handleKey(socketType);
    handleGameSocket(game, socketType);
    return (
        <div className="container-fluid" id="game-page">
            <NavigationBar />
            <ScoreBoard score={ score }/>
            <GameBoard player={ player } ball={ ball } paddle={ paddle }/>
            <BottomLine />
        </div>
    );
}

export default Game;
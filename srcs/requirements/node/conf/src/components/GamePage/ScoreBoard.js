import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import "../../css/game-page/score-board.css";

function ScoreBoard() {
    return (
        <div className="row" id="score-board">
            <div className="col" id="player1">5</div>
            <div className="col" id="seperator">:</div>
            <div className="col" id="player2">5</div>
        </div>
    );
}

export default ScoreBoard;
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import "../../css/game/score-board.css";

function ScoreBoard({ game }) {
    return (
        <div className="row" id="score-board">
            <div className="col" id="score1">{ game.score.p1 }</div>
            <div className="col" id="seperator">:</div>
            <div className="col" id="score2">{ game.score.p2 }</div>
        </div>
    );
}

export default ScoreBoard;
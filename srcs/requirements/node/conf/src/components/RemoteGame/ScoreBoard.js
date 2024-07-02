import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import "../../css/game/score-board.css";

function ScoreBoard({ game }) {
    return (
        <div className="row" id="score-board">
            <div className="col" id="score1">{ game.score[0] }</div>
            <div className="col" id="seperator">:</div>
            <div className="col" id="score2">{ game.score[1] }</div>
        </div>
    );
}

export default ScoreBoard;
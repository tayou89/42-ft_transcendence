import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { socket, SOCKET } from "./constant.js";
import "../../css/game/score-board.css";

function ScoreBoard({ scoreString }) {
    const score = JSON.parse(scoreString);

    return (
        <div className="row" id="score-board">
            <div className="col" id="score1">{ score.p1 }</div>
            <div className="col" id="seperator">:</div>
            <div className="col" id="score2">{ score.p2 }</div>
        </div>
    );
}

function catchScoreEvent(score1, score2, setScore1, setScore2) {
    useEffect(() => {
        const handleScoreEvent = ({ p1, p2}) => {
            if (p1 != score1)
                setScore1(() => p1);
            if (p2 != score2)
                setScore2(() => p2);
        };
        socket.on(SOCKET.EVENT.SOCKET, handleScoreEvent);
        return (() => {
            socket.off(SOCKET.EVENT.SOCKET);
        });
    }, [score1, score2]);
}

export default ScoreBoard;
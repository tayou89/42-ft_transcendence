import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { socket, SOCKET } from "./constant.js";
import "../../css/game-page/score-board.css";

function ScoreBoard() {
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);

    catchScoreEvent(score1, score2, setScore1, setScore2)
    return (
        <div className="row" id="score-board">
            <div className="col">{score1}</div>
            <div className="col">:</div>
            <div className="col">{score2}</div>
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
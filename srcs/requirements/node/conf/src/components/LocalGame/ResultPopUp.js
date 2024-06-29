import { useEffect, MyReact } from "../../MyReact/MyReact.js";
import "../../css/game/result-popup.css";

function ResultPopUp({ game }) {
    if (!game.isOver)
        return (null);
    return (
        <div id="result-text-box">
            <div id="result-text">Game Over</div>
        </div>
    );
}

export default ResultPopUp;
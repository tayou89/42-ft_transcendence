import { useEffect, MyReact } from "../../MyReact/MyReact.js";
import "../../css/game/result-popup.css";
import { END_SCORE } from "./constant.js";
import { removeGameEvents } from "./Game.js";

function ResultPopUp({ game }) {
    if (!isGameOver(game.score))
        return (null);
    removeGameEvents(game);
    game.ballSetter.setBallStop();
    useEffect(() => {
        game.eventHandler.addGameEndEvent();
        return (() => game.eventHandler.removeGameEndEvents());
    }, []);
    return (
        <div id="result-text-box">
            <div id="result-text">Game Over</div>
        </div>
    );
}

function isGameOver(score) {
    return (score.some((score) => score === END_SCORE));
}

export default ResultPopUp;
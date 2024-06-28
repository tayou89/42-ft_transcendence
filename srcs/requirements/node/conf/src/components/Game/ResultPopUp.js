import { useEffect, MyReact } from "../../MyReact/MyReact.js";
import { GAME } from "./constant.js";
import "../../css/game/result-popup.css";

function ResultPopUp({ game }) {
    const myResult = getMyResult(game);
    const resultText = getResultText(myResult);

    console.log("game:", game);
    console.log("myResult:", myResult);
    console.log("resultText:", resultText);
    if (isGameResultEmpty(game.result))
        return (null);
    useEffect(() => {
        game.eventHandler.addGameEndEvent(myResult, game);
        return (() => game.eventHandler.removeGameEndEvent());
    }, []);
    return (
        <div id="result-text-box">
            <div id="result-text">{ resultText }</div>
        </div>
    );
}

function getMyResult(game) {
    const myPosition = getMyPosition(game.myId, game.players);
    console.log("myPosition:", myPosition);

    return (myPosition === GAME.POSITION.LEFT ? game.result.p1 : game.result.p2);
}

function getMyPosition(myId, players) {
    const myIndex = players.findIndex(player => player.id === myId);

    return (myIndex === 0 ? GAME.POSITION.LEFT : GAME.POSITION.RIGHT);
}

function getResultText(myResult) {
    return (myResult === GAME.RESULT.WIN ? "You Win!" : "You Lose");
}

function isGameResultEmpty(gameResult) {
    return (Object.keys(gameResult).length ? false : true);
}

export default ResultPopUp;
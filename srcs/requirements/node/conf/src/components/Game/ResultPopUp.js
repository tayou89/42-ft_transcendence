import { MyReact } from "../../MyReact/MyReact.js";
import { GAME } from "./constant.js";
import EventHandler from "../Room/EventHandler.js";
import "../../css/game/result-popup.css";


function ResultPopUp({ gameResult, data, players }) {
    const myResult = getMyResult(gameResult, data.myId, players);
    const resultText = getResultText(myResult);

    if (!Object.keys(gameResult).length)
        return (null);
    useEffect(() => {
        const eventHandler = new EventHandler();

        eventHandler.addGameEndEvent(myResult, gameData);
        return (() => eventHandler.removeGameEndEvent());
    }, []);
    return (
        <div id="result-text-box">
            <div id="result-text">{ resultText }</div>
        </div>
    );
}

function getMyResult(gameResult, myId, players) {
    const myPosition = getMyPosition(myId, players);

    if (myPosition === GAME.POSITION.LEFT)
        return (gameResult.p1);
    else
        return (gameResult.p2);
}

function getResultText(myResult) {
    if (myResult === GAME.RESULT.WIN)
        return ("You Win!");
    else
        return ("You Lose");
}

function getMyPosition(myId, players) {
    const myIndex = players.findIndex(player => player.id === myId);

    if (myIndex === 0)
        return (GAME.POSITION.LEFT);
    else
        return (GAME.POSITION.RIGHT);
}

export default ResultPopUp;
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { GAME_RESULT } from "./constant.js";
import "../../css/game/result-popup.css";

function ResultPopUp({ result }) {
    if (result === "")
        return (null);
    const resultText = getResultText(result);

    return (
        <div id="result-text-box">
            <div id="result-text">{ resultText }</div>
        </div>
    );
}

function getResultText(result) {
    if (result === GAME_RESULT.WIN)
        return ("You Win!");
    else
        return ("You Lose");
}

export default ResultPopUp;
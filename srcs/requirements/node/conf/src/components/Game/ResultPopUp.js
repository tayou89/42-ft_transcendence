import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { GAME_RESULT } from "./constant.js";

function ResultPopUp({ result }) {
    if (result === "")
        return (null);
    const resultText = getResultText(result);

    return (
        <div id="result-text">{ resultText }</div>
    );
}

function getResultText(result) {
    if (result === GAME_RESULT.WIN)
        return ("You Win!");
    else
        return ("You Lose");
}
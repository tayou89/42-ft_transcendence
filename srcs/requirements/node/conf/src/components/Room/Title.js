import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { GAME } from "../Game/constant.js";
import "../../css/room/title.css";

function Title({ title, type } ) {
    const gameType = getGameType(type);

    return (
        <div className="row" id="room-title-box">
            <div className="row" id="room-title">{ title }</div>
            <div className="row" id="match-type">{ gameType }</div>
        </div>
    );
}

function getGameType(type) {
    if (type === GAME.TYPE.PONG)
        return ("1 vs 1");
    else
        return ("Tournament");
}

export default Title;
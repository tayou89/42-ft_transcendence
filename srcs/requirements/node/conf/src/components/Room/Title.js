import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { GAME } from "../RemoteGame/constant.js";
import "../../css/room/title.css";

function Title({ room } ) {
    const gameTypeText = getGameTypeText(room.type);

    return (
        <div className="row" id="room-title-box">
            <div className="row" id="room-title">{ room.title }</div>
            <div className="row" id="match-type">{ gameTypeText }</div>
        </div>
    );
}

function getGameTypeText(type) {
    if (type === GAME.TYPE.PONG)
        return ("1 vs 1");
    else
        return ("Tournament");
}

export default Title;
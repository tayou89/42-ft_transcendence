import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { GAME } from "../RemoteGame/constant.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "./CountDown.js";
import "../../css/room/room.css";

export function Player({ room }) {
    const elementId = getElementId(room.type);
    const playerSlots = getPlayerSlots(room);

    return (
        <div className="row" id={ elementId }>
            { playerSlots }
            <CountDown room={ room } />
        </div>
    );
}

function getElementId(type) {
    return (type === GAME.TYPE.PONG ? "player-pong" : "player-mtt");
}

function getPlayerSlots(room) {
    return (room.players.map((p, i) => {
        const player = { ...p, index: i, isMyPlayer: (room.myId === p.id) };

        return (<PlayerSlot player={player} room={ room } />);
    }));
}

export default Player;
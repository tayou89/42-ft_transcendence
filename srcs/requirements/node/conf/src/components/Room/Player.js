import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { GAME } from "../Game/constant.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "./CountDown.js";
import "../../css/room/room.css";

export function Player({ room }) {
    const elementId = getElementId(room.type);
    const playerSlots = getPlayerSlots(room);

    useEffect(() => {
    	socket.turnOnRoomChannel(setPlayers);
    }, []);
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
    return (room.players.map((player) => 
        <PlayerSlot player={ player } room={ room } isMySlot={ room.myId === player.id } />
    ));
}

export default Player;
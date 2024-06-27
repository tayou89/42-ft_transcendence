import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { GAME } from "../Game/constant.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "./CountDown.js";
import "../../css/room/room.css";

export function Player({ room }) {
    const [ players, setPlayers ] = useState(getInitialPlayers(room.type));
    const elementId = getElementId(room.type);
    const playerSlots = getPlayerSlots(players, room);

    useEffect(() => {
    	room.socket.turnOnRoomChannel(setPlayers);
        return (() => room.socket.turnOffRoomChannel());
    }, []);
    return (
        <div className="row" id={ elementId }>
            { playerSlots }
            <CountDown players={ players } room={ room } />
        </div>
    );
}

function getInitialPlayers(type) {
    return (type === GAME.TYPE.PONG ? [{}, {}] : [{}, {}, {}, {}]);
}


function getElementId(type) {
    return (type === GAME.TYPE.PONG ? "player-pong" : "player-mtt");
}

function getPlayerSlots(players, room) {
    return (players.map((player) => 
        <PlayerSlot player={ player } room={ room } isMySlot={ room.myId === player.id } />
    ));
}

export default Player;
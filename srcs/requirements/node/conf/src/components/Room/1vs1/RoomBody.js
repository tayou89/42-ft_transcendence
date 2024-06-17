import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "../utility/CountDown.js";
import "../../../css/room/1vs1/room.css";

function RoomBody({ player1, player2 }) {
    return (
        <div className="row" id="room-body">
            <PlayerSlot player={ player1 } />
            <PlayerSlot player={ player2 } />
            <CountDown count={ 5 } />
        </div>
    );
}

export default RoomBody;
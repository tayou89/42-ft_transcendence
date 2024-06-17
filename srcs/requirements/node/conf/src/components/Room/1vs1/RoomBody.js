import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import PlayerSlot from "./PlayerSlot.js";
import "../../../css/room/1vs1/room.css";

function RoomBody() {
    return (
        <div className="row" id="room-body">
            <PlayerSlot />
            <PlayerSlot />
        </div>
    );
}

export default RoomBody;
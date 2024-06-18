import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "../utility/CountDown.js";
import "../../../css/room/1vs1/room.css";

function RoomBody({ player1, player2, set1, set2 }) {
    console.log("RoomBody player1:", player1.ready);
    console.log("RoomBody player2:", player2.ready);
    return (
        <div className="row" id="room-body">
            <PlayerSlot player={ player1 } set={ set1 } />
            <PlayerSlot player={ player2 } set={ set2 } />
            {/* <CountDown count={ 5 } /> */}
        </div>
    );
}

export default RoomBody;
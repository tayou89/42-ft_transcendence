import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import "../../../css/room/1vs1/room.css";

function PlayerSlot({ player }) {
    console.log(player.photoURL);
    return (
        <div className="col" id="player-slot">
            <div id="room-slot-photo-box"></div>
                <img id="room-slot-photo" src={ player.photoURL } />
            <div id="name">{ player.name }</div>
            <div id="level">{ Math.floor( player.exp / 1000) }</div>
        </div>
    );
}

export default PlayerSlot;
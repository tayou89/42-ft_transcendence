import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import ReadyButton from "../utility/ReadyButton.js";
import { pongSocket } from "../../utility/socket.js";
import "../../../css/room/1vs1/player-slot.css";

function PlayerSlot({ player }) {
    player.exp = 3000;

    return (
        <div className="col" id="player-slot">
            <div id="room-slot-photo-box">
                <img id="room-slot-photo" src={ player.photoURL } />
            </div>
            <div id="name">{ player.name }</div>
            <div id="level">Level { Math.floor( player.exp / 1000) }</div>
            <ReadyButton status={ player.ready } socket={ pongSocket } />
        </div>
    );
}

export default PlayerSlot;
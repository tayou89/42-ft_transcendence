import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import "../../../css/room/1vs1/room.css";

function PlayerSlot() {
    const [ userData, setUserData ] = useState({});

    return (
        <div className="col d-flex justify-content-center align-items-center" id="player-slot">
            <div id="photo-box"></div>
            <div id="name"></div>
            <div id="level"></div>
        </div>
    );
}

export default PlayerSlot;
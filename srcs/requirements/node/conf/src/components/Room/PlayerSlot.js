import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import ReadyButton from "./ReadyButton.js";
import { GAME } from "../Game/constant.js";
import "../../css/room/player-slot.css";

function PlayerSlot({ socket, player, type, isMySlot }) {
    const elementIds = getElementsIds(type);

    if (!player.id)
        return (<div className="col" id={ elementIds[0] }></div>);
    return (
        <div className="col" id={ elementIds[0] }>
            <div id={ elementIds[1] } >
                <img id={ elementIds[2] } src={ player.photoURL } />
            </div>
            <div id="name">{ player.display_name}</div>
            <div id="level">Level { Math.floor( player.exp / 1000) }</div>
            <ReadyButton status={ player.ready } socket={ socket } isMySlot={ isMySlot } />
        </div>
    );
}

function getElementsIds(type) {
    const ids = [ "slot", "photo-box", "photo" ];
    const suffix = (type === GAME.TYPE.PONG) ? "-pong" : "-mtt";
    const elementIds = ids.map(id => id + suffix);
    
    return (elementIds);
}

export default PlayerSlot;
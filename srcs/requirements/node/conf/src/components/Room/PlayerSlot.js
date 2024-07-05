import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import ReadyButton from "./ReadyButton.js";
import { GAME } from "../RemoteGame/constant.js";
import "../../css/room/player-slot.css";

function PlayerSlot({ player, room, setRoom }) {
    const elementIds = getElementsIds(room.type);
    const handleClickEvent = (event) => {
        console.log("playerslot click event occured!!");
        console.log("event.target.id:", event.target.id);
        console.log("elementIds[1]", elementIds[1]);
        if (event.target.id === elementIds[1]){
            console.log("player:", player);
            setRoom((prev) => ({...prev, clickedPlayer: { ...player }}));
        }
    };

    if (!player.id) {
        return (
            <div className="col" id={ elementIds[0] }>
                <div id="slot-title">{ 'Player ' + (player.index + 1)}</div>
                <div id={ elementIds[1] }></div>
            </div>
        );
    }
    return (
        <div className="col" id={ elementIds[0]}>
            <div id="slot-title">{ 'Player ' + (player.index + 1)}</div>
            <div id={ elementIds[1] } onClick={ handleClickEvent }>
                <div id={ elementIds[2] } >
                    <img id={ elementIds[3] } src={ player.photoURL } />
                </div>
                <div id="name">{ player.display_name}</div>
                <div id="level">Level { Math.floor( player.exp / 1000) }</div>
                <ReadyButton player={ player } socket={ room.socket } />
            </div>
        </div>
    );
}

function getElementsIds(type) {
    const ids = [ "slot", "slot-box", "photo-box", "photo" ];
    const suffix = (type === GAME.TYPE.PONG) ? "-pong" : "-mtt";
    const elementIds = ids.map(id => id + suffix);
    
    return (elementIds);
}

export default PlayerSlot;
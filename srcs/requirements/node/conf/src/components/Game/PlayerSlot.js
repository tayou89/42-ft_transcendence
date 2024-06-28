import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import "../../css/game/game-board.css";
import "../../css/game/player-slot.css";

function PlayerSlot({ id, player }) {
    if (!player)
        return (<div className="col" id={id}></div>);
    const level = player.exp === 0 ? 0 : Math.floor(player.exp / 1000);

    return (
        <div className="col" id={id}>
            <div className="row" id="game-slot-photo-box">
                <img className="col" id="game-slot-photo" src={ player.photoURL } />
            </div>
            <div className="row" id="player-name">{ player.display_name }</div>
            <div className="row" id="player-level">Level { level }</div>
        </div>
    );
}

export default PlayerSlot;
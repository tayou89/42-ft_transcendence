import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { socket, SOCKET } from "./constant.js";
import Fetch from "../Fetch/Fetch.js";
import "../../css/game/player-slot.css";

function PlayerSlot({id}) {
    // const [playerId, setPlayerId] = useState(0);
    const [playerData, setPlayerData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const playerId = 1;

    try {
        // getPlayerId(playerId, setPlayerId, slotId);
        // if (!playerId)
        //     throw (Error("player slot can't find player"));
        Fetch.setUserData(setPlayerData, setIsLoading, playerId);
        if (!playerData)
            throw Error("player data doesn't exist");
        console.log("playerData:", playerData);
        console.log("name:", playerData.name)
        console.log("Level:", Math.floor(playerData.id / 1000))
        return (
            <div className="col" id={id}>
                <div className="row" id="game-slot-photo-box">
                    <img className="col" id="game-slot-photo" src={playerData.photoURL} />
                </div>
                <div className="row" id="player-name">{playerData.name}</div>
                <div className="row" id="player-level">Level { Math.floor(playerData.id / 1000) }</div>
            </div>
        );
    }
    catch (error) {
        return (
            <div className="col" id={id}>Loading...</div>
        );
    }
}

function getPlayerId(playerId, setPlayerId, slotId) {
    useEffect(() => {
        const handleGameData = ({ p1, p2 }) => {
            const player = (slotId === "player1") ? p1 : p2;

            if (!player)
                throw Error("player slot can't find player");
            if (player.id !== playerId)
                setPlayerId(player.pid);
        }

        socket.on(SOCKET.EVENT.GAME, handleGameData);
        return (() => {
            socket.off(SOCKET.EVENT.GAME);
        });
    }, [playerId]);
}



export default PlayerSlot;
import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import { socket, SOCKET } from "./constant.js";

function PlayerSlot({id}) {
    const [playerId, setPlayerId] = useState(0);

    getPlayerId(playerId, setPlayerId, slotId);
    if (playerId)
        getPlayerData(playerId);
    return (
        <div className="col" id={id}>
            <div className="row">image</div>
            <div className="row">name</div>
            <div className="row">level</div>
        </div>
    );
}

function getPlayerId(playerId, setPlayerId, slotId) {
    useEffect(() => {
        const handleGameData = ({ p1, p2 }) => {
            const player = (slotId === "player1") ? p1 : p2;

            if (player && player.id !== playerId)
                setPlayerId(player.pid);
        }

        socket.on(SOCKET.EVENT.GAME, handleGameData);
        return (() => {
            socket.off(SOCKET.EVENT.GAME);
        });
    }, [playerId]);
}

export default PlayerSlot;
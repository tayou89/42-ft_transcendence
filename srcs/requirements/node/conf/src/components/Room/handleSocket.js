import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { SOCKET } from "./socket.js";
import Fetch from "./Fetch.js";

class RoomEventHandler {
    static sendRoomJoinMessage(socket, id, title) {
        socket.emit(SOCKET.EVENT.JOIN_ROOM, { pid: id, room: title });
    }

    static receivePlayerData(newPlayers, currentPlayers, setPlayers) {
        const players = Object.values(newPlayers);

        players.forEach(async (player, index) => {
            if (player?.pid !== currentPlayers[index]?.id)
                await Fetch.setUserData(setPlayers, player.pid, index);
            if ((player.pid && currentPlayers[index].id) && 
                (player.ready !== currentPlayers[index]?.ready))
                setPlayers((prev) => setReady(prev, index));
        });
    }
}

export function receivePlayerData(socket, roomPlayers, playerSetter) {
    const receiveRoomEvent = (player) => {
        const players = Object.values(player);

        players.forEach((player, index) => {
            if (player?.pid !== roomPlayers[index]?.id)
                Fetch.setUserData(playerSetter, player.pid, index);
            if ((player.pid && roomPlayers[index].id) && 
                (player.ready !== roomPlayers[index]?.ready))
                playerSetter((prev) => setReady(prev, index));
        });
    };

    useEffect(() => {
        socket.on(SOCKET.EVENT.ROOM, receiveRoomEvent);

        return (() => {
            socket.off(SOCKET.EVENT.ROOM, receiveRoomEvent);
        });
    }, []);
}

function setReady(prev, index) {
    const newArray = prev.map((player, i) => (
        (i === index) ? { ...player, ready: !player.ready } : player
    ));

    return (newArray);
}
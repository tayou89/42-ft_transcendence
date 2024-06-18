import { pongSocket, SOCKET } from "../../utility/socket.js";
import Fetch from "../../Fetch/Fetch.js";

export function receivePlayerData(room) {
    pongSocket.on(SOCKET.EVENT.ROOM, (data) => receiveRoomEvent(data, room));
}

function receiveRoomEvent({ p1, p2 }, room) {
    if (p1.pid !== room.player1.id)
        Fetch.setUserData(room.setPlayer1, p1.pid);
    if (p2.pid !== room.player2.id)
        Fetch.setUserData(room.setPlayer2, p2.pid);
    if (p1.ready !== room.player1.ready)
        setPlayer1((prev) => ({ ...prev, ready: p1.ready }));
    if (p2.ready !== room.player2.ready)
        setPlayer2((prev) => ({ ...prev, ready: p2.ready }));
}

export function sendRoomJoinMessage(id, title) {
    pongSocket.emit("room", { pid: id, room_name: title });
}
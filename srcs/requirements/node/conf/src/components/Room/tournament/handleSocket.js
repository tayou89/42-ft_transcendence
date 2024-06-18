import { pongSocket, SOCKET } from "../../utility/socket.js";
import Fetch from "../../Fetch/Fetch.js";

export function receivePlayerData(roomData) {
    pongSocket.on(SOCKET.EVENT.ROOM, (data) => receiveRoomEvent(data, roomData));
}

function receiveRoomEvent({ p1, p2, p3, p4 }, roomData) {
    if (p1.pid !== roomData.player1.id)
        Fetch.setUserData(roomData.setPlayer1, p1.pid);
    if (p2.pid !== roomData.player2.id)
        Fetch.setUserData(roomData.setPlayer2, p2.pid);
    if (p3.pid !== roomData.player3.id)
        Fetch.setUserData(roomData.setPlayer2, p2.pid);
    if (p4.pid !== roomData.player4.id)
        Fetch.setUserData(roomData.setPlayer2, p2.pid);
    if (p1.ready !== roomData.player1.ready)
        setPlayer1((prev) => ({ ...prev, ready: p1.ready }));
    if (p2.ready !== roomData.player2.ready)
        setPlayer2((prev) => ({ ...prev, ready: p2.ready }));
    if (p3.ready !== roomData.player3.ready)
        setPlayer3((prev) => ({ ...prev, ready: p3.ready }));
    if (p2.ready !== roomData.player2.ready)
        setPlayer4((prev) => ({ ...prev, ready: p4.ready }));
}

export function sendRoomJoinMessage(id, title) {
    pongSocket.emit("room", { pid: id, room_name: title });
}
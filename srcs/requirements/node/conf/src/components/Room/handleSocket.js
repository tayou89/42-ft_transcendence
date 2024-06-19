import Fetch from "../Fetch/Fetch.js";

export function sendRoomJoinMessage(socket, id, title) {
    socket.emit("room", { pid: id, room_name: title });
}

export function receivePlayerData(socket, roomPlayers, playerSetter) {
    const receiveRoomEvent = (player) => {
        const players = Object.values(player);

        players.forEach((player, index) => {
            if (player?.id !== roomPlayers[index]?.id)
                Fetch.setUserData(playerSetter, player.id, index);
            if ((player.id && roomPlayers[index].id) && 
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
        (i === index) ? { ...prev, ready: !player.ready } : player
    ));

    return (newArray);
}
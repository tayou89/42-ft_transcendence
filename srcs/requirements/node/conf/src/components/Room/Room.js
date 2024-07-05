import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import TopLine from "./TopLine.js";
import Title from "./Title.js";
import Player from "./Player.js";
import BottomLine from "./BottomLine.js";
import QuitPopUp from "./QuitPopUp.js";
import UserPage from "./UserPage.js";
import { pongSocket, mttSocket } from "../RemoteGame/GameSocket.js";
import { GAME } from "../RemoteGame/constant.js";
import { RoomEventHandler } from "./EventHandler.js";
import "../../css/room/room.css";

function Room(props) {
    try {
        const [ room, setRoom ] = useState(getInitialRoomData(props));

        console.log("room:", room);
        checkAllReady(room, setRoom);
        useEffect(() => {
            room.socket.sendRoomJoinMessage(room.myId, room.title);
            room.socket.turnOnRoomChannel(setRoom);
            room.eventHandler.addPageBackEvent();
            return (() => room.eventHandler.removePageBackEvent());
        }, []);
        if (room.clickedPlayer && !room.isAllReady) {
            return (
                <div className="container" id="room-page">
                    <TopLine />
                    <UserPage room={ room } setRoom={ setRoom } />
                </div>
            );
        }
        return (
            <div className="container-fluid" id="room-page">
                <TopLine />
                <Title room={ room } />
                <Player room={ room } setRoom={ setRoom } />
                <BottomLine setFunction={ setRoom } />
                <QuitPopUp data={ room } setFunction={ setRoom } /> 
            </div>
        );
    }
    catch (error) {
        alert(error);
        navigate("/home");
    }
}

function getInitialRoomData(props) {
    if (!props.room)
        throw new Error("Can't access the room");
    const room = props.room;
    const socket = !room.mtt ? pongSocket : mttSocket;

    return ({ 
        roomId: room.id,
        myId: props.myId,
        title: room.name,
        type: !room.mtt ? GAME.TYPE.PONG : GAME.TYPE.MTT,
        socket: socket,
        players: !room.mtt ? [{}, {}] : [{}, {}, {}, {}],
        isQuitClicked: false,
        isAllReady: false,
        clickedPlayer: null,
        count: 5,
        eventHandler: new RoomEventHandler(socket),
    });
}

function checkAllReady(room, setRoom) {
    if (room.players.every(player => player.ready))
        setRoom((prev) => ({ ...prev, isAllReady: true }));
}

export default Room;
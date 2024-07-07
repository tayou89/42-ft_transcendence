import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import TopLine from "./TopLine.js";
import Title from "./Title.js";
import Player from "./Player.js";
import BottomLine from "./BottomLine.js";
import QuitPopUp from "./QuitPopUp.js";
import getRoomsData from "../utility/getRoomsData.js";
import { pongSocket, mttSocket } from "../RemoteGame/GameSocket.js";
import { GAME } from "../RemoteGame/constant.js";
import { RoomEventHandler } from "./EventHandler.js";
import "../../css/room/room.css";

function Room(props) {
    try {
        const [ room, setRoom ] = useState(getInitialRoomData(props));

        useEffect(() => {
            const executeRoomFunctions = async() => {
                try {
                    await checkRoomExistence(room.roomId);
                    room.socket.sendRoomJoinMessage(room.myId, room.title);
                    room.socket.turnOnRoomChannel(setRoom);
                    room.eventHandler.addPageBackEvent();
                }
                catch (error) {
                    handleRoomError(error);
                }
            }
            executeRoomFunctions();
            return (() => room.eventHandler.removePageBackEvent());
        }, []);
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
        handleRoomError(error);
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
        eventHandler: new RoomEventHandler(socket),
    });
}

async function checkRoomExistence(roomId) {
    const rooms = await getRoomsData();

    if (!rooms.some((room) => room.id === roomId))
        throw new Error("This is not existing room");
}

function handleRoomError(error) {
    alert(error);
    navigate("/home");
}

export default Room;
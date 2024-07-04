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
import "../../css/room/room.css";

function Room() {
    const [ room, setRoom ] = useState(getInitialRoomData());

    useEffect(() => {
        const executeRoomFunctions = async () => {
            try {
                const roomsData = await getRoomsData();
                const myRoomData = getMyRoomData(roomsData, room.roomId);

                checkSamePlayer(myRoomData, room.myId);
                room.socket.sendRoomJoinMessage(room.myId, room.title);
                room.socket.turnOnRoomChannel(setRoom);
            }
            catch (error) {
                alert(error);
                navigate("/home");
            }
        };
        executeRoomFunctions();
    }, []);
    return (
        <div className="container-fluid" id="room-page">
            <TopLine />
            <Title room={ room } />
            <Player room={ room } />
            <BottomLine setFunction={ setRoom } />
            <QuitPopUp data={ room } setFunction={ setRoom } /> 
        </div>
    );
}

function getInitialRoomData() {
    const queryString = window.location.search;
    const URLData = new URLSearchParams(queryString);

    return ({ 
        roomId: Number(URLData.get('roomId')),
        title: URLData.get('title'),
        myId: Number(URLData.get('myId')),
        type: URLData.get('type'),
        socket: URLData.get('type') === GAME.TYPE.PONG ? pongSocket : mttSocket,
        isQuitClicked: false,
        players: URLData.get('type') === GAME.TYPE.PONG ? [{}, {}] : [{}, {}, {}, {}],
    });
}

function getMyRoomData(roomsData, roomId) {
    for (let room of roomsData) {
        if (room.id === roomId)
            return (room);
    }
    throw new Error("Room does not exist");
}

function checkSamePlayer(roomData, myId) {
    const roomKeysToCheck = [ "p1", "p2", "p3", "p4" ];

    for (let key of roomKeysToCheck) {
        if (roomData[key] === myId)
            throw new Error("Can't enter: you already joined the same room");
    }
}

export default Room;
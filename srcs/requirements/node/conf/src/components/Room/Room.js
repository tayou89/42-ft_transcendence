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
            const exists = await isExistedRoom(room.roomId);

            if (!exists) 
                navigate("/home");
            else {
                room.socket.sendRoomJoinMessage(room.myId, room.title);
                room.socket.turnOnRoomChannel(setRoom);
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

async function isExistedRoom(roomId) {
    const roomData = await getRoomsData();

    return (roomData.some((room) => room.id === roomId));
}

export default Room
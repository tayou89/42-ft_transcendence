import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import NavigationBar from "../utility/NavigationBar.js";
import Title from "./Title.js";
import Player from "./Player.js";
import BottomLine from "./BottomLine.js";
import QuitPopUp from "./QuitPopUp.js";
import { pongSocket, mttSocket } from "./PongSocket.js";
import { GAME } from "../Game/constant.js";
import "../../css/room/room.css";

function Room() {
    const [ room, setRoom ] = useState(getInitialRoomData());

    useEffect(() => {
        room.socket.sendRoomJoinMessage(room.myId, room.title);
    }, []);
    return (
        <div className="container-fluid" id="room-page">
            <NavigationBar />
            <Title room={ room } />
            <Player room={ room } />
            <BottomLine setRoom={ setRoom } />
            <QuitPopUp room={ room } setRoom={ setRoom } /> 
        </div>
    );
}

function getInitialRoomData() {
    const queryString = window.location.search;
    const URLData = new URLSearchParams(queryString);

    return ({ 
        title: URLData.get('title'),
        myId: Number(URLData.get('myId')),
        type: URLData.get('type'),
        socket: URLData.get('type') === GAME.TYPE.PONG ? pongSocket : mttSocket,
        isQuitClicked: false,
    });
}

export default Room
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import TopLine from "./TopLine.js";
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
    	room.socket.turnOnRoomChannel(setRoom);
        return (() => room.socket.turnOffRoomChannel());
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
        title: URLData.get('title'),
        myId: Number(URLData.get('myId')),
        type: URLData.get('type'),
        socket: URLData.get('type') === GAME.TYPE.PONG ? pongSocket : mttSocket,
        isQuitClicked: false,
        players: URLData.get('type') === GAME.TYPE.PONG ? [{}, {}] : [{}, {}, {}, {}],
    });
}

export default Room
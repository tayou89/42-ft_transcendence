import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import NavigationBar from "../utility/NavigationBar.js";
import Title from "./Title.js";
import Player from "./Player.js";
import BottomLine from "./BottomLine.js";
import QuitPopUp from "./QuitPopUp.js";
import { pongSocket, mttSocket } from "./Socket.js";
import { GAME_TYPE } from "../Game/constant.js";
import "../../css/room/room.css";

function Room() {
    const [ isQuitClicked, setIsQuitClicked ] = useState(false);
    const [ title, type, myId ] = getRoomData();
    const socket = getSocket(type);

    useEffect(() => {
        socket.sendRoomJoinMessage(id, title);
    }, []);
    return (
        <div className="container-fluid" id="room-page">
            <NavigationBar />
            <Title title={ title } type={ type } />
            <Player type={ type } socket={ socket } myId={ myId } />
            <BottomLine setIsQuitClicked={ setIsQuitClicked } />
            <QuitPopUp socket={ socket } isClicked={ isQuitClicked } set={ setIsQuitClicked } /> 
        </div>
    );
}

function getRoomData() {
    const queryString = window.location.search;
    const URLData = new URLSearchParams(queryString);
    const title = URLData.get('title');
    const type = URLData.get('type');
    const myId = URLData.get('myId');

    return ([title, type, myId]);
}

function getSocket(gameType) {
    if (gameType === GAME_TYPE.PONG)
        return (pongSocket);
    else
        return (mttSocket);
}

export default Room
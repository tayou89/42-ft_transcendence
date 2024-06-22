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
    const [ title, type, id ] = getRoomData();
    const socket = getSocket(type);

    useEffect(() => {
        socket.sendRoomJoinMessage(id, title);
    }, []);
    return (
        <div className="container-fluid" id="room-page">
            <NavigationBar />
            <Title title={ title } type={ type } />
            <Player type={ type } socket={ socket } id={ id } />
            <BottomLine setIsQuitClicked={ setIsQuitClicked } />
            <QuitPopUp socket={ socket } isClicked={ isQuitClicked } set={ setIsQuitClicked } /> 
        </div>
    );
}

function getRoomData() {
}

function getSocket(gameType) {
    if (gameType === GAME_TYPE.PONG)
        return (pongSocket);
    else
        return (mttSocket);
}

export default Room
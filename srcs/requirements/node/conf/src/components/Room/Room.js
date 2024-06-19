import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import NavigationBar from "../utility/NavigationBar.js";
import Title from "./Title.js";
import Player from "./Player.js";
import BottomLine from "./BottomLine.js";
import { getQuitPopUp } from "./QuitPopUp.js";
import { pongSocket, mttSocket } from "./socket.js";
import { sendRoomJoinMessage } from "./handleSocket.js";
import { GAME_TYPE } from "../Game/constant.js";
import "../../css/room/room.css";

function Room({ title = "title", type = GAME_TYPE.PONG, id = 0 }) {
    const [ isQuitClicked, setIsQuitClicked ] = useState(false);
    const socket = getSocket(type); 
    const quitPopUp = getQuitPopUp(socket, isQuitClicked, setIsQuitClicked);

    sendRoomJoinMessage(socket, id, title);
    type = GAME_TYPE.MTT;
    return (
        <div className="container-fluid" id="room-page">
            <NavigationBar />
            <Title title={ title } type={ type } />
            <Player type={ type } socket={ socket } />
            <BottomLine setIsQuitClicked={ setIsQuitClicked } socket={ socket } />
            { quitPopUp }
        </div>
    );
}

function getSocket(type) {
    if (type === GAME_TYPE.PONG)
        return (pongSocket);
    else
        return (mttSocket);
}

export default Room;
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import NavigationBar from "../utility/NavigationBar.js";
import Title from "./Title.js";
import Player from "./Player.js";
import BottomLine from "./BottomLine.js";
import QuitPopUp from "../utility/QuitPopUp.js";
import { pongSocket, mttSocket } from "../utility/socket.js";
import { sendRoomJoinMessage } from "./handleSocket.js";
import "../../css/room/1vs1/room.css";

function Room({ title, type = "1vs1", id = 0 }) {
    const socket = (type === "1vs1") ?  pongSocket : mttSocket;
    const [ isQuitClicked, setIsQuitClicked ] = useState(false);

    sendRoomJoinMessage(socket, id, title);
    return (
        <div className="container-fluid" id="room-page">
            <NavigationBar />
            <Title title={ title } />
            <Player socket={ socket } />
            <BottomLine setIsQuitClicked={ setIsQuitClicked } />
            { isQuitClicked ? <QuitPopUp setIsQuitClicked={ setIsQuitClicked }/> : null }
        </div>
    );
}

export default Room;
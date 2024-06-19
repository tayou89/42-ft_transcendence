import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import NavigationBar from "../../utility/NavigationBar.js";
import Title from "../utility/Title.js";
import RoomBody from "./RoomBody.js";
import BottomLine from "../utility/BottomLine.js";
import QuitPopUp from "../../utility/QuitPopUp.js";
import Fetch from "../../Fetch/Fetch.js";
import { pongSocket } from "../../utility/socket.js";
import { sendRoomJoinMessage, receivePlayerData } from "./handleSocket.js";
import "../../css/room/1vs1/room.css";

function Room1vs1({ title, id }) {
    const [ player1, setPlayer1 ] = useState({});
    const [ player2, setPlayer2 ] = useState({});
    const [ isQuitClicked, setIsQuitClicked ] = useState(false);
    const roomData = { player1, setPlayer1, player2, setPlayer2 };

    sendRoomJoinMessage(id, title);
    Fetch.setUserData(setPlayer1, 1);
    Fetch.setUserData(setPlayer2, 1);
    // receivePlayerData(roomData);
    title = "1:1 하실 분 들어오세요!";
    return (
        <div className="container-fluid" id="room-page">
            <NavigationBar />
            <Title title={title}/>
            <RoomBody roomData={ roomData } socket={ pongSocket } />
            <BottomLine setIsQuitClicked={ setIsQuitClicked } />
            { isQuitClicked ? <QuitPopUp setIsQuitClicked={ setIsQuitClicked }/> : null }
        </div>
    );
}

export default Room1vs1;
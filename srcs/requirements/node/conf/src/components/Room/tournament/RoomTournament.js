import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import NavigationBar from "../../utility/NavigationBar.js";
import Title from "../utility/Title.js";
import BottomLine from "../utility/BottomLine.js";
import QuitPopUp from "../../utility/QuitPopUp.js";
import Fetch from "../../Fetch/Fetch.js";
import { mttSocket } from "../../utility/socket.js";
import { sendRoomJoinMessage, receivePlayerData } from "./handleSocket.js";
import handleRoomSocket from "./handleSocket.js";

function RoomTournament({ title, id }) {
    const [ player1, setPlayer1 ] = useState({});
    const [ player2, setPlayer2 ] = useState({});
    const [ player3, setPlayer3 ] = useState({});
    const [ player4, setPlayer4 ] = useState({});
    const [ isQuitClicked, setIsQuitClicked ] = useState(false);
    const roomData = { 
        player1, setPlayer1, player2, setPlayer2, 
        player3, setPlayer3, player4, setPlayer4 
    };

    sendRoomJoinMessage(id, title);
    title = "1:1 하실 분 들어오세요!";
    // receivePlayerData(roomData);
    return (
        <div className="container-fluid" id="room-page">
            <NavigationBar />
            <RoomBody roomData={ roomData } socket={ mttSocket } />
            <Title title={title}/>
        </div>
    );
}
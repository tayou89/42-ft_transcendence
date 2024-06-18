import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import NavigationBar from "../../utility/NavigationBar.js";
import handleRoomSocket from "./handleSocket.js";
import Title from "../utility/Title.js";
import RoomBody from "./RoomBody.js";
import BottomLine from "../utility/BottomLine.js";
import QuitPopUp from "../../utility/QuitPopUp.js";
import Fetch from "../../Fetch/Fetch.js";
import { SOCKET } from "../../utility/socket.js";
import "../../../css/room/1vs1/room.css";


function Room1vs1({ title }) {
    const defaultPlayer = { id: 0, photoURL: "", name: "", exp: 0, ready: false };
    const [ player1, setPlayer1 ] = useState(defaultPlayer);
    const [ player2, setPlayer2 ] = useState(defaultPlayer);
    const [ clickQuitButton, setClickQuitButton ] = useState(false);
    const roomData = {
        player1: player1,
        setPlayer1: setPlayer1,
        player2: player2,
        setPlayer2: setPlayer2,
    }

    Fetch.setUserData(setPlayer1, 1);
    Fetch.setUserData(setPlayer2, 1);
    // handleRoomSocket(roomData);
    title = "1:1 하실 분 들어오세요!";
    return (
        <div className="container-fluid" id="room-page">
            <NavigationBar />
            <Title title={title}/>
            <RoomBody roomData={ roomData } socketType={ SOCKET.TYPE.PONG } />
            <BottomLine socketType={ SOCKET.TYPE.PONG } setClickStatus={ setClickQuitButton } />
            { clickQuitButton ? <QuitPopUp setClickStatus={ setClickQuitButton }/> : null }
        </div>
    );
}

export default Room1vs1;
import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import NavigationBar from "../../utility/NavigationBar.js";
// import handleRoomSocket from "./handleSocket.js";
import Title from "../utility/Title.js";
import RoomBody from "./RoomBody.js";
import Fetch from "../../Fetch/Fetch.js";

function Room1vs1({ title }) {
    const defaultPlayer = { id: 0, photoURL: "", name: "", exp: 0, ready: false };
    const [ player1, setPlayer1 ] = useState(defaultPlayer);
    const [ player2, setPlayer2 ] = useState(defaultPlayer);
    const room = {
        player1: player1,
        setPlayer1: setPlayer1,
        player2: player2,
        setPlayer2: setPlayer2,
    }

    // handleRoomSocket(room);
    Fetch.setUserData(setPlayer1, 1);
    title = "1:1 하실 분 들어오세요!";
    return (
        <div className="container-fluid" id="game-page">
            <NavigationBar />
            <Title title={title}/>
            <RoomBody player1={ player1 } player2={ player1 } />
        </div>
    );
}

export default Room1vs1;
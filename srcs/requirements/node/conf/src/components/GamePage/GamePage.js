import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import NavigationBar from "./NavigationBar.js";
import ScoreBoard from "./ScoreBoard.js";
import GameBoard from "./GameBoard.js";
import BottomLine from "./BottomLine.js";
import Fetch from "../Fetch/Fetch.js";
import { KEY, SOCKET, socket } from "./constant.js";
import "../../css/game-page/game-page.css";

function GamePage() {
    const [myData, setMyData] = useState("");

    getMyData(myData, setMyData);
    addKeyEvent();
    return (
        <div className="container-fluid" id="game-page">
            <NavigationBar myData={myData}/>
            <ScoreBoard />
            <GameBoard />
            <BottomLine />
        </div>
    );
}

function getMyData(myData, setMyData) {
    useEffect(() => {
        const callMyData = async() => { 
            const data = await Fetch.myData();

            setMyData(() => JSON.stringify(data));
        };
        callMyData();
    }, []);
}

function addKeyEvent() {
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return (() => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        });
    }, []);
}

function handleKeyDown(event) {
    if (KEY.UP.includes(event.key))
        socket.emit(SOCKET.EVENT.KEY, -1);
    else if (KEY.DOWN.includes(event.key))
        socket.emit(SOCKET.EVENT.KEY, 1);
};

function handleKeyUp(event) {
    if (KEY.UP.includes(event.key) || KEY.DOWN.includes(event.key))
        socket.emit(SOCKET.EVENT.KEY, 1);
}

export default GamePage;
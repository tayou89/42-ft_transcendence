import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import NavigationBar from "../utility/NavigationBar.js";
import ScoreBoard from "./ScoreBoard.js";
import GameBoard from "./GameBoard.js";
import BottomLine from "../Room/BottomLine.js";
import QuitPopUp from "../Room/QuitPopUp.js";
import ResultPopUp from "./ResultPopUp.js";
import EventHandler from "../Room/EventHandler.js";
import { INIT } from "./constant.js";
import "../../css/game/game-page.css";

const eventHandler = new EventHandler();

function Game({ data }) {
    const [ isQuitClicked, setIsQuitClicked ] = useState(false);
    const [ game, setGame ] = useState(getInitialGameData());
    const [ players, setPlayers ] = useState([{}, {}]);
    const [ gameResult, setGameResult ] = useState({});
    const socket = data.socket;

    useEffect(() => {
        disableScroll();
        addEvents(socket, { setIsQuitClicked }); 
        turnOnSocketChannels(socket, { setPlayers, setGame, setGameResult });
        return (() => {
            enableScroll();
            removeEvents();
            turnOffSocketChannels(socket);
        });
    }, []);
    return (
        <div className="container-fluid" id="game-page">
            <NavigationBar />
            <ScoreBoard score={ game.score }/>
            <GameBoard players={ players } ball={ game.ball } paddle={ game.paddle }/>
            <BottomLine socket={ socket } setIsQuitClicked={ setIsQuitClicked }/>
            <QuitPopUp socket={ socket } isClicked={ isQuitClicked } set={ setIsQuitClicked } /> 
            <ResultPopUp gameResult={ gameResult } data={ data } players={ players } />
        </div>
    );
}

function getInitialGameData() {
    const initialGameData = {
        ball: { x: INIT.BALL.X, y: INIT.BALL.Y },
        paddle: { p1: INIT.PADDLE1.Y, p2: INIT.PADDLE2.Y },
        score: { p1: 0, p2: 0},
    }
    return (initialGameData);
}

function disableScroll() {
    document.body.id = "no-scroll";
}

function addEvents(socket, setFunctions) {
    eventHandler.addKeyEvent(socket);
    eventHandler.addRefreshEvent(setFunctions.setIsQuitClicked);
    eventHandler.addPageBackEvent(setFunctions.setIsQuitClicked);
}

function turnOnSocketChannels(socket, setFunctions) {
    socket.turnOnRoomChannel(setFunctions.setPlayers);
    socket.turnOnGameChannel(setFunctions.setGame);
    socket.turnOnResultChannel(setFunctions.setGameResult);
}

function enableScroll() {
    document.body.id = "";
}

function removeEvents() {
    eventHandler.removeKeyEvent();
    eventHandler.removeRefreshEvent();
}

function turnOffSocketChannels(socket) {
    socket.turnOffRoomChannel();
    socket.turnOffGameChannel();
    socket.turnOffResultChannel();
}

export default Game;
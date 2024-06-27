import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import TopLine from "../Room/TopLine.js";
import ScoreBoard from "./ScoreBoard.js";
import GameBoard from "./GameBoard.js";
import BottomLine from "../Room/BottomLine.js";
import QuitPopUp from "../Room/QuitPopUp.js";
import ResultPopUp from "./ResultPopUp.js";
import EventHandler from "../Room/EventHandler.js";
import { INIT } from "./constant.js";
import "../../css/game/game-page.css";

function Game({ data }) {
    const [ game, setGame ] = useState(getInitialGameData(data));

    useEffect(() => {
        addEvents(game); 
        turnOnSocketChannels(game, setGame);
        return (() => {
            removeEvents(game);
            turnOffSocketChannels(game);
        });
    }, []);
    return (
        <div className="container-fluid" id="game-page">
            <TopLine />
            <ScoreBoard game={ game } />
            <GameBoard game={ game } />
            <BottomLine setFunction={ setGame } />
            <QuitPopUp data={ game } setFunction={ setGame } /> 
            <ResultPopUp game={ game } />
        </div>
    );
}

function getInitialGameData(data) {
    return ({
        socket: data.socket,
        type: data.type,
        myId: data.myId,
        round: data.gameRound,
        ball: { x: INIT.BALL.X, y: INIT.BALL.Y },
        paddle: { p1: INIT.PADDLE1.Y, p2: INIT.PADDLE2.Y },
        score: { p1: 0, p2: 0},
        result: {},
        players: [{}, {}],
        isQuitClicked: false,
        eventHandler: new EventHandler(),
    });
}

function addEvents(game) {
    game.eventHandler.addKeyEvent(game.socket);
    game.eventHandler.addRefreshEvent();
}

function removeEvents(game) {
    game.eventHandler.removeKeyEvent();
    game.eventHandler.removeRefreshEvent();
}

function turnOnSocketChannels(game, setGame) {
    game.socket.turnOnRoomChannel(setGame);
    game.socket.turnOnGameChannel(setGame);
    game.socket.turnOnResultChannel(setGame);
}

function turnOffSocketChannels(game) {
    game.socket.turnOffRoomChannel();
    game.socket.turnOffGameChannel();
    game.socket.turnOffResultChannel();
}

export default Game;
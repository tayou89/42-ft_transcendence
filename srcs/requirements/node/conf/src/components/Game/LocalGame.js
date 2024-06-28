import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import TopLine from "../Room/TopLine.js";
import ScoreBoard from "./ScoreBoard.js";
import GameBoard from "./GameBoard.js";
import BottomLine from "./BottomLine.js";
import ResultPopUp from "./ResultPopUp.js";
import EventHandler from "../Room/EventHandler.js";
import { INIT } from "./constant.js";
import "../../css/game/game-page.css";

function LocalGame() {
    const [ game, setGame ] = useState(getInitialGameData(data));

    useEffect(() => {
        addEvents(game, setGame); 
        return (() => {
            removeEvents(game);
        });
    }, []);
    return (
        <div className="container-fluid" id="game-page">
            <TopLine />
            <ScoreBoard game={ game } />
            <GameBoard game={ game } />
            <BottomLine />
            <ResultPopUp game={ game } />
        </div>
    );
}

function getInitialGameData(data) {
    return ({
        ball: { x: INIT.BALL.X, y: INIT.BALL.Y },
        paddle: { p1: INIT.PADDLE1.Y, p2: INIT.PADDLE2.Y },
        score: { p1: 0, p2: 0},
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

export default LocalGame;
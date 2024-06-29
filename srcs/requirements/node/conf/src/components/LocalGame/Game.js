import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import TopLine from "../Room/TopLine.js";
import ScoreBoard from "../RemoteGame/ScoreBoard.js";
import GameBoard from "../RemoteGame/GameBoard.js";
import BottomLine from "../RemoteGame/BottomLine.js";
import ResultPopUp from "../RemoteGame/ResultPopUp.js";
import { LocalEventHandler }from "../Room/EventHandler.js";
import { INIT } from "../RemoteGame/constant.js";
import "../../css/game/game-page.css";

function LocalGame() {
    const [ game, setGame ] = useState(getInitialGameData());

    console.log("game:", game);
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

function getInitialGameData() {
    return ({
        ball: { x: INIT.BALL.X, y: INIT.BALL.Y },
        paddle: [ INIT.PADDLE1.Y, INIT.PADDLE2.Y ],
        score: { p1: 0, p2: 0},
        isQuitClicked: false,
        eventHandler: new EventHandler(),
        isOver: false,
    });
}

function addEvents(game, setGame) {
    game.eventHandler.addLocalKeyEvent(setGame);
}

function removeEvents(game) {
    game.eventHandler.removeLocalKeyEvent();
}

export default LocalGame;
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import TopLine from "../Room/TopLine.js";
import ScoreBoard from "./ScoreBoard.js";
import GameBoard from "./GameBoard.js";
import BottomLine from "./BottomLine.js";
import ResultPopUp from ".//ResultPopUp.js";
import LocalEventHandler from "./EventHandler.js";
import BallSetter from "./BallSetter.js";
import HitChecker from "./HitChecker.js";
import QuitPopUp from "./QuitPopUp.js";
import { INIT } from "./constant.js";
import "../../css/game/game-page.css";

function LocalGame() {
    const [ game, setGame ] = useState(getInitialGameData());

    if (HitChecker.isBallHitGoalLine(game.ball))
        setNextGame(setGame);
    useEffect(() => {
        addGameEvents(game, setGame); 
        game.ballSetter.setBallMove(setGame);
        return (() => {
            removeGameEvents(game);
            game.ballSetter.setBallStop();
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

function getInitialGameData() {
    return ({
        ball: INIT.BALL,
        paddle: [ INIT.PADDLE1, INIT.PADDLE2 ],
        score: [ 0, 0 ],
        isQuitClicked: false,
        eventHandler: new LocalEventHandler(),
        ballSetter: new BallSetter(),
    });
}

function addGameEvents(game, setGame) {
    game.eventHandler.addKeyDownEvent(setGame);
    game.eventHandler.addKeyUpEvent(setGame);
}

export function removeGameEvents(game) {
    game.eventHandler.removeKeyDownEvent();
    game.eventHandler.removeKeyUpEvent();
}

function setNextGame(setGame) {
    setGame((prev) => {
        const newScore = getNewScore(prev);

        return ({
            ...prev,
            ball: INIT.BALL,
            paddle: [ INIT.PADDLE1, INIT.PADDLE2 ],
            score: newScore,
        });
    });
}

function getNewScore(game) {
    if (game.ball.direction.x > 0)
        return ([ game.score[0] + 1, game.score[1] ]);
    else
        return ([ game.score[0], game.score[1] + 1]);
}

export default LocalGame;
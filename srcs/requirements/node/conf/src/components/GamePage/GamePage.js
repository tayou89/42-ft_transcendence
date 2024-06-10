import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import NavigationBar from "./NavigationBar.js";
import ScoreBoard from "./ScoreBoard.js";
import GameBoard from "./GameBoard.js";
import "../../css/game-page/game-page.css";

function GamePage() {
    return (
        <div className="container-fluid" id="game-page">
            <NavigationBar />
            <ScoreBoard />
            <GameBoard />
        </div>
    );
}

export default GamePage;
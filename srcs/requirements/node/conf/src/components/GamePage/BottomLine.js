import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import QuitButton from "../utility/QuitButton.js";
import "../../css/game-page/bottom-line.css";

function BottomLine() {
    return (
        <div className="row" id="gamepage-bottom">
            <QuitButton />
        </div>
    );
}

export default BottomLine;
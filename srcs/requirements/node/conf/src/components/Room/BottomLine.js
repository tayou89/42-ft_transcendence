import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import QuitButton from "../utility/QuitButton.js";
import "../../css/room/utility/bottom-line.css";

function BottomLine({ socketType, setClickStatus }) {
    return (
        <div className="row" id="room-bottom">
            <QuitButton socketType={ socketType } setClickStatus={ setClickStatus } />
        </div>
    );
}

export default BottomLine;
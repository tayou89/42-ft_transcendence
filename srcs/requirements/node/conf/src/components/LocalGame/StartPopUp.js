import { useState, useEffect, MyReact } from "../../MyReact/MyReact";
import "../../css/game/start-popup.css";

function StartPopUp({ game, setGame }) {
    if (game.isStarted)
        return (null);
    const [ startText, setStartText ] = useState("Ready");

    useEffect(() =>{
        setTimeout(() => {
            setStartText(() => "Start!")
        }, 1500);
        setTimeout(() => {
            setGame((prev) => ({ ...prev, isStarted: true }))
        }, 2500);
    }, []);
    return (
        <div id="start-text-box">
            <div id="start-text">{ startText }</div>
        </div>
    );
}

export default StartPopUp;
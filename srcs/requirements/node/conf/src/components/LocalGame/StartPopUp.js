import { useState, useEffect, MyReact } from "../../MyReact/MyReact";
import "../../css/game/start-popup.css";

function StartPopUp({ game, setGame }) {
    if (game.isStarted)
        return (null);
    const [ startText, setStartText ] = useState("Ready");

    useEffect(() =>{
        setTimeout(() => {
            setStartText(() => "Start!")
        }, 1000);
        setTimeout(() => {
            setGame((prev) => ({ ...prev, isStarted: true }))
        }, 2000);
    }, []);
    return (
        <div id="start-text-box">
            <div id="start-text">{ startText }</div>
        </div>
    );
}

export default StartPopUp;
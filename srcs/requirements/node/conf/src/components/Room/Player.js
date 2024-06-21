import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import { GAME_TYPE, GAME_POSITION } from "../Game/constant.js";
import { receivePlayerData } from "./EventHandler.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "./CountDown.js";
import Fetch  from "./Fetch.js";
import "../../css/room/room.css";

export function Player({ type, socket, id }) {
    const [ players, setPlayers ] = useState(getDefaultPlayers(type));
    const [ count, setCount ] = useState(5);

    receivePlayerData(socket, players, setPlayers);
    if (count <= 0)
        navigate("/game");
        // navigate("/game", { socket, position: getPlayerPosition(id, players) });
    if (isAllReady(players))
        startCountDown(count, setCount);
    return (
        <div className="row" id={ getElementId(type) }>
            { getPlayerSlots(players, setPlayers, type) }
            { getCountDown(players, count) }
        </div>
    );
}

function getDefaultPlayers(type) {
    if (type === GAME_TYPE.PONG)
        return ([{}, {}]);
    else
        return ([{}, {}, {}, {}]);
}

function isAllReady(players) {
    if (players.length === 0)
        return (false);
    return (players.every(player => player.ready));
}

function getElementId(type) {
    if (type === GAME_TYPE.PONG)
        return ("player-pong");
    else
        return ("player-mtt");
}

function getPlayerSlots(players, setPlayers, type) {
    return ( 
        players.map((p, i) => (
            <PlayerSlot player={ p } set={ setPlayers } index={ i } type={ type } />))
    );
}

function countDown(count, setCount) {
    setInterval(() => {
        if (count > 0)
            setCount(count => count -1) 
    }, 1000);
}

function stopCount(countDown) {
    clearInterval(countDown);
}

function startCountDown(count, setCount) {
    useEffect(() => {
        const countDown = setInterval(() => { 
            if (count > 0)
                setCount(count => count -1) 
        }, 1000);

        return (() => clearInterval(countDown));
    }, [count]);
}

function getCountDown(players, count) {
    if (isAllReady(players))
        return (<CountDown count={ count } />);
    else
        return (null); 
}

function getPlayerPosition(id, players) {
    const myPlayerSlotNumber = (players.findIndex(player => player.id === id)) + 1;

    if (myPlayerSlotNumber % 2 === 1)
        return (GAME_POSITION.LEFT)
    else
        return (GAME_POSITION.RIGHT)
}

export default Player;
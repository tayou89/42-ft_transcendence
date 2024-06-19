import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import { GAME_TYPE } from "../Game/constant.js";
import { receivePlayerData } from "./handleSocket.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "./CountDown.js";
import Fetch  from "../Fetch/Fetch.js";
import "../../css/room/room.css";

export function Player({ type, socket }) {
    const defaultPlayers = getDefaultPlayers(type); 
    const [ players, setPlayers ] = useState(defaultPlayers);
    const [ count, setCount ] = useState(5);
    const playerSlots = getPlayerSlots(players, setPlayers, type);
    const countDown = getCountDown(players, count);
    const id = getElementId(type);

    receivePlayerData(socket, players, setPlayers);
    Fetch.setUserData(setPlayers, 1, 0);
    Fetch.setUserData(setPlayers, 1, 1);
    Fetch.setUserData(setPlayers, 1, 2);
    Fetch.setUserData(setPlayers, 1, 3);
    if (count <= 0)
        navigate("/game", { socket });
    if (isAllReady(players))
        startCountDown(count, setCount);
    return (
        <div className="row" id={ id }>
            { playerSlots }
            { countDown }
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

export default Player;
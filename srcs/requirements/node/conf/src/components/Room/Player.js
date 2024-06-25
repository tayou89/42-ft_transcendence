import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import { GAME } from "../Game/constant.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "./CountDown.js";
import "../../css/room/room.css";

export function Player({ type, socket, myId }) {
    const [ players, setPlayers ] = useState(getDefaultPlayers(type));
    const [ count, setCount ] = useState(5);

    if (count <= 0)
        navigate("/game", { data: { socket, type, myId, gameRound: 1 }} );
    useEffect(() => {
    	socket.turnOnRoomChannel(setPlayers);
        return (() => socket.turnOffRoomChannel());
    }, []);
    useEffect(() => {
        if (isAllReady(players) && count > 0)
            countDown(setCount);
        return (() => stopCount);
    }, [players, count]);
    return (
        <div className="row" id={ getElementId(type) }>
            { getPlayerSlots(players, type, socket, myId) }
            { getCountDown(players, count) }
        </div>
    );
}

function getDefaultPlayers(type) {
    if (type === GAME.TYPE.PONG)
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
    if (type === GAME.TYPE.PONG)
        return ("player-pong");
    else
        return ("player-mtt");
}

function getPlayerSlots(players, type, socket, myId) {
    const playerSlot = players.map((p) => {
        const isMySlot = isMyId(myId, p.id); 

        return (<PlayerSlot player={ p } type={ type } socket={ socket } isMySlot={ isMySlot} />);
    });
    return ( playerSlot );
}

function isMyId(myId, id) {
    if (myId === id)
        return (true);
    else    
        return (false);
}

function countDown(setCount) {
    setTimeout(() => {
            setCount(count => count - 1) 
    }, 1000);
}

function stopCount(countDown) {
    clearTimeout(countDown);
}

function getCountDown(players, count) {
    if (isAllReady(players))
        return (<CountDown count={ count } />);
    else
        return (null); 
}

export default Player;
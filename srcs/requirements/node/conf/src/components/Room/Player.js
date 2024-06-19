import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate, Link } from "../../MyReact/MyReactRouter.js";
import { receivePlayerData } from "./handleSocket.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "./CountDown.js";
import "../../css/room/1vs1/room.css";

export function Player({ socket }) {
    const [ players, setPlayers ] = useState([]);
    const [ count, setCount ] = useState(5);
    const playerSlots = makePlayerSlots(players, setPlayers);
    const isAllReady = players.every(player => player.ready);

    receivePlayerData(socket, players, setPlayers);
    if (count <= 0)
        navigate("/game", { players, socketType });
    if (isAllReady)
        makeCount(count, setCount);
    return (
        <div className="row" id="room-body">
            { playerSlots }
            { isAllReady ? <CountDown count={ count } /> : null }
        </div>
    );
}

function makePlayerSlots(players, setPlayers) {
    return ( 
        players.map((p, i) => (
            <PlayerSlot player={ p[i] } set={ setPlayers } index={ i } />))
    );
}

function makeCount(count, setCount) {
    useEffect(() => {
        const countDown = setInterval(() => { 
            if (count > 0)
                setCount(count => count -1) 
        }, 1000);

        return (() => clearInterval(countDown));
    }, [count]);
}

export default Player;
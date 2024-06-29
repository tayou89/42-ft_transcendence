import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import "../../css/room/count-down.css";

function CountDown({ room }) {
    const [ count, setCount ] = useState(5);

    if (!isAllReady(room.players))
        return (null);
    if (count <= 0)
        navigate("/remote_game", { data: getDeliveryDataToGame(room) } );
    useEffect(() => {
        if (isAllReady(room.players))
            countDown(count, setCount);
        return (() => stopCount(countDown));
    }, [count]);
    return (
        <div id="count-down">{ count }</div>
    );
}

function isAllReady(players) {
    if (players.length === 0)
        return (false);
    return (players.every(player => player.ready));
}

function getDeliveryDataToGame(room) {
    return {
        type: room.type,
        myId: room.myId,
        gameRound: 1,
    }
}

function countDown(count, setCount) {
    if (count)
        setTimeout(() => setCount(count => count - 1), 1000);
}

function stopCount(countDown) {
    clearTimeout(countDown);
}

export default CountDown;
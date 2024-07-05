import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import "../../css/room/count-down.css";

function CountDown({ room }) {
    const [count, setCount] = useState(5);
    const countText = count ? count : "Start!";

    if (!room.isAllReady) 
        return (null);
    console.log("everybody is ready!!");
    if (count <= 0) 
        setTimeout(() => navigate("/remote_game", { data: getGameData(room) } ), 500);
    useEffect(() => {
        if (room.isAllReady)
            countDown(count, setCount);
        return (() => stopCount(countDown));
    }, [count]);
    return (
        <div id="count-down">{ countText }</div>
    );
}


function getGameData(room) {
    return {
        type: room.type,
        myId: room.myId,
        roomId: room.roomId,
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
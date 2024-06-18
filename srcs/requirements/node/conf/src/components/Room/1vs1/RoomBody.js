import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "../utility/CountDown.js";
import { navigate } from "../../../MyReact/MyReactRouter.js";
import "../../../css/room/1vs1/room.css";

function RoomBody({ player1, player2, set1, set2 }) {
    const [ count, setCount ] = useState(5);

    console.log("player1.id:", player1.id);
    console.log("player2.id:", player2.id);
    console.log("RoomBody player1:", player1.ready);
    console.log("RoomBody player2:", player2.ready);
    console.log("count:", count);
    // if (count === 0)
    //     navigate("/game", { player1, player2 });
    if (player1.ready && player2.ready){
        useEffect(() => {
            const countDown = setInterval(() => { setCount(count => count -1) }, 1000);

            return (() => clearInterval(countDown));
        }, [count]);
        return (
            <div className="row" id="room-body">
                <PlayerSlot player={ player1 } set={ set1 } />
                <PlayerSlot player={ player2 } set={ set2 } />
                <CountDown count={ count } />
            </div>
        );
    }
    else {
        return (
            <div className="row" id="room-body">
                <PlayerSlot player={ player1 } set={ set1 } />
                <PlayerSlot player={ player2 } set={ set2 } />
            </div>
        );
    }
}

export default RoomBody;
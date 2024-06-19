import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "../utility/CountDown.js";
import { navigate, Link } from "../../../MyReact/MyReactRouter.js";
import "../../../css/room/1vs1/room.css";

function RoomBody({ roomData, socket }) {
    const [ count, setCount ] = useState(5);
    const { player1, setPlayer1, player2, setPlayer2 } = { ...roomData };
    const player =  { left: player1, right: player2 }
    const [, setRenderCount] = useState(0);

    // if (count === 0)
    //     navigate("/game", { player, socketType });
    if (player1.ready && player2.ready) {
        navigate("/game", { player, socket });
        setRenderCount(count => count + 1);
        // makeCount(count, setCount);
    }
    return (
        <div className="row" id="room-body">
            <PlayerSlot player={ player1 } set={ setPlayer1 } />
            <PlayerSlot player={ player2 } set={ setPlayer2 } />
            <Link to="/game" props={{ player, socket }}>GamePage</Link>
            { (player1.ready && player2.ready) ? <CountDown count={ count } /> : null }
        </div>
    );
}

function makeCount(count, setCount) {
    useEffect(() => {
        const countDown = setInterval(() => { setCount(count => count -1) }, 1000);

        return (() => clearInterval(countDown));
    }, [count]);

}

export default RoomBody;
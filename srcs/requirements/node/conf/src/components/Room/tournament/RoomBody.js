import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import PlayerSlot from "./PlayerSlot.js";
import CountDown  from "../utility/CountDown.js";
import { navigate, Link } from "../../../MyReact/MyReactRouter.js";
import "../../../css/room/1vs1/room.css";

function RoomBody({ roomData, socket }) {
    const [ count, setCount ] = useState(5);
    const { p1, set1, p2, set2, p3, set3, p4, set4  } = { ...roomData };
    const player =  { left: p1, right: p2 }
    const [, setRenderCount] = useState(0);

    // if (count === 0)
    //     navigate("/game", { player, socketType });
    if (p1.ready && p2.ready) {
        navigate("/game", { player, socket });
        setRenderCount(count => count + 1);
        // makeCount(count, setCount);
    }
    return (
        <div className="row" id="room-body">
            <PlayerSlot player={ p1 } set={ set1 } />
            <PlayerSlot player={ p2 } set={ set2 } />
            <PlayerSlot player={ p3 } set={ set3 } />
            <PlayerSlot player={ p4 } set={ set4 } />
            <Link to="/game" props={{ player, socket }}>GamePage</Link>
            { (p1.ready && p2.ready) ? <CountDown count={ count } /> : null }
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
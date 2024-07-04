import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import TopLine from "./TopLine.js";
import Title from "./Title.js";
import Player from "./Player.js";
import BottomLine from "./BottomLine.js";
import QuitPopUp from "./QuitPopUp.js";
import { pongSocket, mttSocket } from "../RemoteGame/GameSocket.js";
import { GAME } from "../RemoteGame/constant.js";
import "../../css/room/room.css";

function Room(props) {
    try {
        if (!props)
            throw new Error("Can't find room data");
        const [ room, setRoom ] = useState(getInitialRoomData(props));

        useEffect(() => {
            room.socket.sendRoomJoinMessage(room.myId, room.title);
            room.socket.turnOnRoomChannel(setRoom);
        }, []);
        return (
            <div className="container-fluid" id="room-page">
                <TopLine />
                <Title room={ room } />
                <Player room={ room } />
                <BottomLine setFunction={ setRoom } />
                <QuitPopUp data={ room } setFunction={ setRoom } /> 
            </div>
        );
    }
    catch (error) {
        alert(error);
        navigate("/home");
    }
}

function getInitialRoomData(props) {
    const room = props.room;

    return ({ 
        title: room.title,
        type: room.type,
        myId: props.myId,
        socket: room.type === GAME.TYPE.PONG ? pongSocket : mttSocket,
        isQuitClicked: false,
        players: room.type === GAME.TYPE.PONG ? [{}, {}] : [{}, {}, {}, {}],
    });
}

export default Room;
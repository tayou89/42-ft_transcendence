import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { SOCKET, pongSocket, mttSocket } from "../utility/socket.js";
import "../../css/utility/quit-button.css";

function QuitButton({ socketType, setClickStatus }) {
    const socket = (socketType === SOCKET.TYPE.PONG) ? pongSocket : mttSocket;
    const handleClickEvent = () => {
        setClickStatus((prev) => (!prev));
    }

    return (
            <div id="quit-button" onClick={ handleClickEvent }>Quit</div>
    );
};

export default QuitButton;
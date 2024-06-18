import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import { SOCKET } from "../../utility/socket.js";
import "../../../css/room/utility/ready-button.css";

function ReadyButton({ status, socket, set }) {
    console.log("status:", status);
    const readyStatus = (status === true) ? "ready" : "not-ready";
    // const handleClickEvent = () => { socket.emit(SOCKET.EVENT.READY, !status); };
    const handleClickEvent = () => {
        set((prev) => ({ ...prev, ready: !status }));
    };

    return (
        <div className="ready-button" id={ readyStatus } onClick={ handleClickEvent }>Ready</div>
    );
}

export default ReadyButton;
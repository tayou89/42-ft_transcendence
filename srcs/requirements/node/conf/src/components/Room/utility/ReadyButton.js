import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import { SOCKET } from "../../utility/socket.js";
import "../../../css/room/utility/ready-button.css";

function ReadyButton({ status, socket }) {
    const readyStatus = (status === true) ? "ready" : "not-ready";
    const handleClickEvent = () => { socket.emit(SOCKET.EVENT.READY, !status); };

    return (
        <button className="ready-button" id={ readyStatus } onClick={ handleClickEvent }>Ready</button>
    );
}

export default ReadyButton;
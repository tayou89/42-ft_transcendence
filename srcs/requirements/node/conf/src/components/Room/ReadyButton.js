import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { SOCKET } from "./Socket.js";
import "../../css/room/ready-button.css";

function ReadyButton({ status, socket }) {
    const id = getElementsId(status);;
    const handleClickEvent = () => { socket.sendReadyStatus(!status); };

    return (
        <div className="ready-button" id={ id } onClick={ handleClickEvent }>Ready</div>
    );
}

function getElementsId(readyStatus) {
    if (readyStatus)
        return ("ready");
    else
        return ("not-ready");
}

function setReady(prev, index) {
    const newArray = prev.map((player, i) => {
        if (i === index)
            return ({ ...player, ready: !player.ready });
        else
            return (player);
    });

    return (newArray);
}

export default ReadyButton;
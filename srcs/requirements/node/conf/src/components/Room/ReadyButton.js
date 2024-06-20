import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { SOCKET } from "./socket.js";
import "../../css/room/ready-button.css";

function ReadyButton({ status, socket, set, index }) {
    const id = getElementsId(status);;
    // const handleClickEvent = () => { socket.emit(SOCKET.EVENT.READY, !status); };
    const handleClickEvent = () => {
        set((prev) => setReady(prev, index));
    };

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
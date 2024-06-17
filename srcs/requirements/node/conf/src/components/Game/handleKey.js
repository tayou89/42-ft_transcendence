import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import { KEY } from "./constant.js";
import { SOCKET, pongSocket , mttSocket } from "../utility/socket.js";

function handleKey(type) {
    const socket = (type === SOCKET.TYPE.PONG) ? pongSocket : mttSocket;
    const handleKeyDown = (event) => {
        if (KEY.UP.includes(event.key))
            socket.emit(SOCKET.EVENT.KEY, -1);
        else if (KEY.DOWN.includes(event.key))
            socket.emit(SOCKET.EVENT.KEY, 1);
    };
    const handleKeyUp = (event) => {
        if (KEY.UP.includes(event.key) || KEY.DOWN.includes(event.key))
            socket.emit(SOCKET.EVENT.KEY, 1);
    }; 

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return (() => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        });
    }, []);
}

export default handleKey;
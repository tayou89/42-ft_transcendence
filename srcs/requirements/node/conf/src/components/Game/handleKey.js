import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import { KEY } from "./constant.js";
import { SOCKET, socket } from "../utility/socket.js";

function handleKey() {
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return (() => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        });
    }, []);
}

function handleKeyDown(event) {
    if (KEY.UP.includes(event.key))
        socket.emit(SOCKET.EVENT.KEY, -1);
    else if (KEY.DOWN.includes(event.key))
        socket.emit(SOCKET.EVENT.KEY, 1);
};

function handleKeyUp(event) {
    if (KEY.UP.includes(event.key) || KEY.DOWN.includes(event.key))
        socket.emit(SOCKET.EVENT.KEY, 1);
}

export default handleKey;
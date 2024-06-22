import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { StateSetter } from "./StateSetter.js";
import { KEY } from "../Game/constant.js";
import Fetch from "./Fetch.js";

class EventHandler {
    constructor (){
        this.#stateSetter = new StateSetter();
    }
    setRoomEvent(currentPlayers, setPlayers) {
        this.#roomEvent = async (newPlayers) => {
            await this.#stateSetter.setPlayers(newPlayers, currentPlayers, setPlayers);
        };
    }
    setGameEvent(currentGameData, setGameData) {
        this.#gameEvent = (newGameData)  => {
            this.#stateSetter.setGameData(newGameData, currentGameData, setGameData);
        };
    }
    setResultEvent(playerPosition, setGameResult) {
        this.#resultEvent = (newGameResult) => {
            const clickEvent = () => navigate("/main");

            this.#stateSetter.setGameResult(newGameResult, playerPosition, setGameResult);
            document.addEventListener("click", clickEvent);
            return (() => document.removeEventListener("click", clickEvent));
        };
    }
    addKeyEvent(socket) {
        this.#setKeyDownEvent(socket);
        this.#setkeyUpEvent(socket);
        document.addEventListener("keydown", this.#keyDownEvent);
        document.addEventListener("keyup", this.#keyUpEvent);
    }
    removeKeyEvent() {
        document.removeEventListener("keydown", this.#keyDownEvent);
        document.removeEventListener("keyup", this.#keyUpEvent);
    }
    #setKeyDownEvent(socket) {
        this.#keyDownEvent = (event) => {
            if (KEY.UP.includes(event.key))
                socket.sendKeyValue(KEY.VALUE.UP);
            else if (KEY.DOWN.includes(event.key))
                socket.sendKeyValue(KEY.VALUE.DOWN);
        };
    }
    #setkeyUpEvent(socket) {
        this.#keyUpEvent = (event) => {
            if (KEY.UP.includes(event.key) || KEY.DOWN.includes(event.key))
                socket.sendKeyValue(KEY.VALUE.NONE);
        };
    }
    get roomEvent() {
        return (this.#roomEvent);
    }
    get keyDownEvent() {
        return (this.#keyDownEvent);
    }
    get keyUpEvent() {
        return (this.#keyUpEvent);
    }
    get gameEvent() {
        return (this.#gameEvent);
    }
    get resultEvent() {
        return (this.#resultEvent);
    }
    #roomEvent;
    #gameEvent;
    #resultEvent;
    #keyDownEvent;
    #keyUpEvent;
    #stateSetter;
}

export default EventHandler;
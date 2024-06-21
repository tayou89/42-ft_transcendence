import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { SOCKET } from "./Socket.js";
import { StateSetter } from "./StateSetter.js";
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
    get roomEvent() {
        return (this.#roomEvent);
    }
    #roomEvent;
    #stateSetter;
}

export default EventHandler;
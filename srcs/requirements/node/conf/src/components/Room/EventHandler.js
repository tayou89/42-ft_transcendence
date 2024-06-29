import { MyReact } from "../../MyReact/MyReact.js";
import StateSetter from "./StateSetter.js";

class RoomSocketEventHandler {
    setRoomEvent(setPlayers) {
        this.#roomEvent = async (newPlayers) => {
            await StateSetter.setPlayers(newPlayers, setPlayers);
        };
    }
    get roomEvent() {
        return (this.#roomEvent);
    }
    #roomEvent;
}

export default RoomSocketEventHandler; 
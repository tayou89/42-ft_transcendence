import { MyReact } from "../../MyReact/MyReact.js";
import RoomStateSetter from "./StateSetter.js";

class RoomSocketEventHandler {
    setRoomEvent(setPlayers) {
        this.#roomEvent = async (newPlayers) => {
            await RoomStateSetter.setPlayers(newPlayers, setPlayers);
        };
    }
    get roomEvent() {
        return (this.#roomEvent);
    }
    #roomEvent;
}

export default RoomSocketEventHandler; 
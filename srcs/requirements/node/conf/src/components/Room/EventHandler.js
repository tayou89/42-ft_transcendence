import { MyReact } from "../../MyReact/MyReact.js";
import RoomStateSetter from "./StateSetter.js";
import logout from "../utility/logout.js";

class RoomSocketEventHandler {
    setRoomEvent(setPlayers) {
        this.#roomEvent = async (newPlayers) => {
            try {
                await RoomStateSetter.setPlayers(newPlayers, setPlayers);
            }
            catch (error) {
                console.log("Room Error:", error);
                logout();
            }
        };
    }
    get roomEvent() {
        return (this.#roomEvent);
    }
    #roomEvent;
}

export default RoomSocketEventHandler; 
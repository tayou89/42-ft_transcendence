import { MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import RoomStateSetter from "./StateSetter.js";
import logout from "../utility/logout.js";
import { SOCKET } from "../RemoteGame/constant.js";

class RoomSocketEventHandler {
    setRoomEvent(setPlayers, socket) {
        this.#roomEvent = async (newPlayers) => {
            try {
                await RoomStateSetter.setPlayers(newPlayers, setPlayers);
            }
            catch (error) {
                console.log("Room Error:", error);
                socket.emit(SOCKET.EVENT.LEAVE_ROOM);
                logout();
            }
        };
    }
    get roomEvent() {
        return (this.#roomEvent);
    }
    #roomEvent;
}

class RoomEventHandler {
    constructor(socket) {
        this.#socket = socket;
    }
    addPageBackEvent() {
        this.#setPageBackEvent();
        window.addEventListener("popstate", this.#pageBackEvent);
    }
    removePageBackEvent() {
        window.removeEventListener("popstate", this.#pageBackEvent);
    }
    #setPageBackEvent() {
        this.#pageBackEvent = () => {
            this.#socket.sendRoomLeaveMessage();
            navigate("/home");
        };
    }
    #socket;
    #pageBackEvent;
}

export { RoomSocketEventHandler, RoomEventHandler }; 
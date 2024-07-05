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
    addUserPageClickEvent(setRoom) {
        this.#setUserPageClickEvent(setRoom);
        document.addEventListener("click", this.#userPageClickEvent);
    }
    removeUserPageClickEvent() {
        document.removeEventListener("click", this.#userPageClickEvent);
    }
    addUserPageKeyDownEvent(setRoom) {
        this.#setUserPageKeyDownEvent(setRoom);
        document.addEventListener("keydown", this.#userPageKeyDownEvent);
    }
    removeUserPageKeyDownEvent() {
        document.removeEventListener("keydown", this.#userPageKeyDownEvent);
    }
    #setPageBackEvent() {
        this.#pageBackEvent = () => {
            this.#socket.sendRoomLeaveMessage();
            navigate("/home");
        };
    }
    #setUserPageClickEvent(setRoom) {
        this.#userPageClickEvent = () => {
            setRoom((prev) => ({ ...prev, clickedPlayer: null }));
        };
    }
    #setUserPageKeyDownEvent(setRoom) {
        this.#userPageClickEvent = (event) => {
            if (event.key === "Esc" || event.key === "Enter")
                setRoom((prev) => ({ ...prev, clickedPlayer: null }));
        };
    }
    #socket;
    #pageBackEvent;
    #userPageClickEvent;
    #userPageKeyDownEvent;
}

export { RoomSocketEventHandler, RoomEventHandler }; 
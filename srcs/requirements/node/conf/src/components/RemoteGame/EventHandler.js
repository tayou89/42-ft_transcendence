import { MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import { KEY, GAME } from "./constant.js";
import { RoomSocketEventHandler } from "../Room/EventHandler.js";
import GameStateSetter from "./StateSetter.js";

class GameSocketEventHandler extends RoomSocketEventHandler {
    setGameEvent(setGameData) {
        this.#gameEvent = (newGameData)  => {
            GameStateSetter.setGameData(newGameData, setGameData);
        };
    }
    setResultEvent(setGameResult) {
        this.#resultEvent = (newGameResult) => {
            GameStateSetter.setGameResult(newGameResult, setGameResult);
        };
    }
    get gameEvent() {
        return (this.#gameEvent);
    }
    get resultEvent() {
        return (this.#resultEvent);
    }
    #gameEvent;
    #resultEvent;
}

class GameEventHandler {
    constructor(socket) {
        this.#socket = socket;
    }
    addKeyDownEvent() {
        this.#setKeyDownEvent();
        document.addEventListener("keydown", this.#keyDownEvent);
    }
    removeKeyDownEvent() {
        document.removeEventListener("keydown", this.#keyDownEvent);
    }
    addKeyUpEvent() {
        this.#setkeyUpEvent();
        document.addEventListener("keyup", this.#keyUpEvent);
    }
    removeKeyUpEvent() {
        document.removeEventListener("keyup", this.#keyUpEvent);
    }
    addRefreshEvent() {
        this.#setRefreshEvent();
        window.addEventListener("beforeunload", this.#refreshEvent);
    }
    removeRefreshEvent() {
        window.removeEventListener("beforeunload", this.#refreshEvent);
    }
    addPageBackEvent() {
        this.#setPageBackEvent();
        window.addEventListener("popstate", this.#pageBackEvent);
    }
    removePageBackEvent() {
        window.removeEventListener("popstate", this.#pageBackEvent);
    }
    addGameEndEvent(myResult, gameData) {
        this.#setGameEndEvent(myResult, gameData);
        document.addEventListener("click", this.#gameEndEvent);
        document.addEventListener("keydown", this.#gameEndEvent);
    }
    removeGameEndEvent() {
        document.removeEventListener("click", this.#gameEndEvent);
        document.removeEventListener("keydown", this.#gameEndEvent);
    }
    #setKeyDownEvent() {
        this.#keyDownEvent = (event) => {
            if (event.repeat)
                return ;
            if (KEY.UP.includes(event.key))
                this.#socket.sendKeyValue(KEY.VALUE.UP);
            else if (KEY.DOWN.includes(event.key))
                this.#socket.sendKeyValue(KEY.VALUE.DOWN);
        };
    }
    #setkeyUpEvent() {
        this.#keyUpEvent = (event) => {
            if (KEY.UP.includes(event.key) || KEY.DOWN.includes(event.key))
                this.#socket.sendKeyValue(KEY.VALUE.NONE);
        };
    }
    #setRefreshEvent() {
        this.#refreshEvent = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };
    }
    #setPageBackEvent() {
        this.#pageBackEvent = () => {
            this.#socket.sendRoomLeaveMessage();
            navigate("/home");
        };
    }
    #setGameEndEvent(myResult, game) {
        this.#gameEndEvent = (event) => { 
            if (event.type !== "click" && event.key !== "Esc" && event.key !== "Enter")
                return ;
            if (game.type === GAME.TYPE.PONG || 
                myResult === GAME.RESULT.LOSE || game.round > 1)
                navigate("/home");
            else {
                this.#socket.sendNextGameMessage();
                navigate("/next_game", { data: { 
                    type: game.type,
                    myId: game.myId,
                    roomId: game.roomId,
                    gameRound: 2,
                }});
            };
        };
    }
    get keyDownEvent() {
        return (this.#keyDownEvent);
    }
    get keyUpEvent() {
        return (this.#keyUpEvent);
    }
    get gameEndEvent() {
        return (this.#gameEndEvent);
    }
    #socket;
    #keyDownEvent;
    #keyUpEvent;
    #gameEndEvent;
    #refreshEvent;
    #pageBackEvent;
}

export { GameSocketEventHandler, GameEventHandler };
import { MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import { KEY, GAME } from "../Game/constant.js";
import StateSetter from "./StateSetter.js";

class EventHandler {
    constructor (){
        this.#stateSetter = new StateSetter();
    }
    setRoomEvent(setPlayers) {
        this.#roomEvent = async (newPlayers) => {
            console.log("Room event occured!", newPlayers);
            await this.#stateSetter.setPlayers(newPlayers, setPlayers);
        };
    }
    setGameEvent(setGameData) {
        this.#gameEvent = (newGameData)  => {
            this.#stateSetter.setGameData(newGameData, setGameData);
        };
    }
    setResultEvent(setGameResult) {
        this.#resultEvent = (newGameResult) => {
            this.#stateSetter.setGameResult(newGameResult, setGameResult);
        };
    }
    addKeyEvent(socket) {
        this.#setKeyDownEvent(socket);
        this.#setkeyUpEvent(socket);
        document.addEventListener("keydown", this.#keyDownEvent);
        document.addEventListener("keyup", this.#keyUpEvent);
    }
    addRefreshEvent() {
        this.#setRefreshEvent();
        window.addEventListener("beforeunload", this.#refreshEvent);
    }
    addPageBackEvent(setQuitClick) {
        this.#setPageBackEvent(setQuitClick);
        window.addEventListener("popstate", this.#pageBackEvent);
    }
    addGameEndEvent(myResult, gameData) {
        this.#setGameEndEvent(myResult, gameData);
        document.addEventListener("click", this.#gameEndEvent);
        document.addEventListener("keydown", this.#gameEndEvent);
    }
    removeKeyEvent() {
        document.removeEventListener("keydown", this.#keyDownEvent);
        document.removeEventListener("keyup", this.#keyUpEvent);
    }
    removeGameEndEvent() {
        console.log("removeGameEndEvent");
        document.removeEventListener("click", this.#gameEndEvent);
        document.removeEventListener("keydown", this.#gameEndEvent);
    }
    removeRefreshEvent() {
        window.removeEventListener("beforeunload", this.#refreshEvent);
    }
    #setKeyDownEvent(socket) {
        this.#keyDownEvent = (event) => {
            if (event.repeat)
                return ;
            event.preventDefault();
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
    #setGameEndEvent(myResult, game) {
        this.#gameEndEvent = (event) => { 
            if (event.type !== "click" && event.key !== "Esc" && event.key !== "Enter")
                return ;
            if (game.type === GAME.TYPE.PONG || 
                myResult === GAME.RESULT.LOSE || game.round > 1)
                navigate("/home");
            else {
                navigate("/game", { data: { 
                    socket: game.socket,
                    type: game.type,
                    myId: game.myId,
                    gameRound: game.round + 1
                }});
            };
        };
    }
    #setRefreshEvent() {
        this.#refreshEvent = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };
    }
    #setPageBackEvent(setQuitClick) {
        this.#pageBackEvent = (event) => {
            event.preventDefault();
            setQuitClick(() => true);
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
    get gameEndEvent() {
        return (this.#gameEndEvent);
    }
    #roomEvent;
    #gameEvent;
    #resultEvent;
    #keyDownEvent;
    #keyUpEvent;
    #gameEndEvent;
    #refreshEvent;
    #pageBackEvent;
    #stateSetter;
}

export default EventHandler;
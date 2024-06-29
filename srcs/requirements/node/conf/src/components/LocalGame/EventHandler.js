import { MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import { KEY, GAME } from "./constant.js";
import RoomEventHandler from "../Room/EventHandler.js";
import StateSetter from "./StateSetter.js";

class RemoteGameEventHandler extends RoomEventHandler {
    constructor (){
        super();
    }
    setGameEvent(setGameData) {
        this.#gameEvent = (newGameData)  => {
            console.log("New Game Data:", newGameData);
            this.stateSetter.setGameData(newGameData, setGameData);
        };
    }
    setResultEvent(setGameResult) {
        this.#resultEvent = (newGameResult) => {
            this.stateSetter.setGameResult(newGameResult, setGameResult);
        };
    }
    addKeyEvent(socket) {
        this.#setKeyDownEvent(socket);
        this.#setkeyUpEvent(socket);
        document.addEventListener("keydown", this.#keyDownEvent);
        document.addEventListener("keyup", this.#keyUpEvent);
    }
    #setKeyDownEvent(socket) {
        this.#keyDownEvent = (event) => {
            if (event.repeat)
                return ;
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
    removeKeyEvent() {
        document.removeEventListener("keydown", this.#keyDownEvent);
        document.removeEventListener("keyup", this.#keyUpEvent);
    }
    addRefreshEvent() {
        this.#setRefreshEvent();
        window.addEventListener("beforeunload", this.#refreshEvent);
    }
    #setRefreshEvent() {
        this.#refreshEvent = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };
    }
    removeRefreshEvent() {
        window.removeEventListener("beforeunload", this.#refreshEvent);
    }
    addPageBackEvent(game, setGame) {
        this.#setPageBackEvent(game, setGame);
        window.addEventListener("popstate", this.#pageBackEvent);
    }
    #setPageBackEvent(game) {
        this.#pageBackEvent = () => {
            game.socket.sendRoomLeaveMessage();
            navigate("/home");
        };
    }
    removePageBackEvent() {
        window.removeEventListener("popstate", this.#pageBackEvent);
    }
    addGameEndEvent(myResult, gameData) {
        this.#setGameEndEvent(myResult, gameData);
        document.addEventListener("click", this.#gameEndEvent);
        document.addEventListener("keydown", this.#gameEndEvent);
    }
    #setGameEndEvent(myResult, game) {
        this.#gameEndEvent = (event) => { 
            if (event.type !== "click" && event.key !== "Esc" && event.key !== "Enter")
                return ;
            if (game.type === GAME.TYPE.PONG || 
                myResult === GAME.RESULT.LOSE || game.round > 1)
                navigate("/home");
            else {
                game.socket.sendNextGameMessage();
                navigate("/next_game", { data: { 
                    socket: game.socket,
                    type: game.type,
                    myId: game.myId,
                    gameRound: 2,
                }});
            };
        };
    }
    removeGameEndEvent() {
        document.removeEventListener("click", this.#gameEndEvent);
        document.removeEventListener("keydown", this.#gameEndEvent);
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
    #gameEvent;
    #resultEvent;
    #keyDownEvent;
    #keyUpEvent;
    #gameEndEvent;
    #refreshEvent;
    #pageBackEvent;
}

class LocalEventHandler {
    constructor (){
        this.#stateSetter = new StateSetter();
        this.#isKeyPressed = { p1: false, p2: false };
    }
    addKeyEvent(setGame) {
        this.#setKeyDownEvent(setGame);
        this.#setKeyUpEvent();
        document.addEventListener("keydown", this.#KeyDownEvent); 
        document.addEventListener("keyup", this.#KeyUpEvent);
    }
    #setKeyDownEvent(setGame) {
        this.#KeyDownEvent = (event) => {
            const key = event.key;

            if ((!KEY.DOWN.includes(key) && !KEY.UP.includes(key)) ||
                event.repeat || (KEY.P1.includes(key) && this.#isKeyPressed.p1) ||
                (KEY.P2.includes(key) && this.#isKeyPressed.p2))
                return ;
            this.#setPlayerKeyPress(key, true);
            this.#stateSetter.setPaddleMove(event, setGame);
        };
    }
    #setKeyUpEvent() {
        this.#KeyUpEvent = (event) => {
            const key = event.key;

            if (!KEY.DOWN.includes(key) && !KEY.UP.includes(key))
                return ;
            this.#setPlayerKeyPress(key, false);
            this.#stateSetter.setPaddleStop(event);
        }
    }
    #setPlayerKeyPress(key, isPressed) {
        if (KEY.P1.includes(key))
            this.#isKeyPressed.p1 = isPressed;
        else
            this.#isKeyPressed.p2 = isPressed;
    }
    removeKeyEvent() {
        document.removeEventListener("keydown", this.#KeyDownEvent);
        document.removeEventListener("keyup", this.#KeyUpEvent);
    }
    #KeyDownEvent;
    #KeyUpEvent;
    #isKeyPressed;
    #stateSetter;
}

export { RemoteEventHandler, LocalEventHandler };
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
			console.log("Room Event Occured:", newPlayers);
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
        document.removeEventListener("click", this.#gameEndEvent);
        document.addEventListener("keydown", this.#gameEndEvent);
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
    #setGameEndEvent(myResult, gameData) {
        if (gameData.type === GAME.TYPE.PONG)
            this.#gameEndEvent = () => { navigate("/home") };
        else {
            if (gameData.gameRound >= 2)
                this.#gameEndEvent = () => { navigate("/home") };
            if (myResult === GAME.RESULT.WIN) {
                this.#gameEndEvent = () => { 
                    navigate("/game", { data: { ...gameData, gameRound: gameData.gameRound + 1 } });
                };
            }
            else
                this.#gameEndEvent = () => { navigate("/home") };
        }
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
    #stateSetter;
}

export default EventHandler;
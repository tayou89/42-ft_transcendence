import { MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import { KEY, GAME } from "../Game/constant.js";
import StateSetter from "./StateSetter.js";

class EventHandler {
    constructor (){
        this.#stateSetter = new StateSetter();
    }
    setRoomEvent(currentPlayers, setPlayers) {
        this.#roomEvent = async (newPlayers) => {
            console.log("Room event occured!", "player:", newPlayers);
            await this.#stateSetter.setPlayers(newPlayers, currentPlayers, setPlayers);
        };
    }
    setGameEvent(currentGameData, setGameData) {
        this.#gameEvent = (newGameData)  => {
            this.#stateSetter.setGameData(newGameData, currentGameData, setGameData);
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
    }
    removeKeyEvent() {
        document.removeEventListener("keydown", this.#keyDownEvent);
        document.removeEventListener("keyup", this.#keyUpEvent);
    }
    removeGameEndEvent() {
        document.removeEventListener("click", this.#gameEndEvent);
    }
    #setKeyDownEvent(socket) {
        this.#keyDownEvent = (event) => {
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
            this.#gameEndEvent = () => { navigate("/main") };
        else {
            if (gameData.gameRound >= 2)
                this.#gameEndEvent = () => { navigate("/main") };
            if (myResult === GAME.RESULT.WIN) {
                this.#gameEndEvent = () => { 
                    navigate("/game", { data: { ...gameData, gameRound: gameData.gameRound + 1 } });
                };
            }
            else
                this.#gameEndEvent = () => { navigate("/main") };
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
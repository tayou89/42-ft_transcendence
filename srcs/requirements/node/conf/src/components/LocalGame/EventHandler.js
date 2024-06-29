import { MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import { KEY, GAME } from "../RemoteGame/constant.js";
import StateSetter from "./StateSetter.js";

class LocalEventHandler {
    constructor (){
        this.#stateSetter = new StateSetter();
        this.#isKeyPressed = { p1: false, p2: false };
    }
    addKeyDownEvent(setGame) {
        this.#setKeyDownEvent(setGame);
        document.addEventListener("keydown", this.#KeyDownEvent); 
    }
    addKeyUpEvent() {
        this.#setKeyUpEvent();
        document.addEventListener("keyup", this.#KeyUpEvent);
    }
    removeKeyDownEvent() {
        document.removeEventListener("keydown", this.#KeyDownEvent);
    }
    removeKeyUpEvent() {
        document.removeEventListener("keyup", this.#KeyUpEvent);
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
    #KeyDownEvent;
    #KeyUpEvent;
    #isKeyPressed;
    #stateSetter;
}

export default LocalEventHandler;
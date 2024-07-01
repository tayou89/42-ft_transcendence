import { MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import { KEY } from ".//constant.js";
import PaddleSetter from "./PaddleSetter.js";

class LocalEventHandler {
    constructor (){
        this.#paddleSetter = new PaddleSetter();
        this.#isKeyPressed = { p1: false, p2: false };
    }
    addKeyDownEvent(setGame) {
        this.#setKeyDownEvent(setGame);
        document.addEventListener("keydown", this.#keyDownEvent); 
    }
    addKeyUpEvent() {
        this.#setKeyUpEvent();
        document.addEventListener("keyup", this.#keyUpEvent);
    }
    removeKeyDownEvent() {
        document.removeEventListener("keydown", this.#keyDownEvent);
    }
    removeKeyUpEvent() {
        document.removeEventListener("keyup", this.#keyUpEvent);
    }
    addGameEndEvent() {
        this.#setGameEndEvent();
        document.addEventListener("click", this.#gameEndEvent);
        document.addEventListener("keydown", this.#gameEndEvent);
    }
    removeGameEndEvent() {
        document.removeEventListener("click", this.#gameEndEvent);
        document.removeEventListener("keydown", this.#gameEndEvent);
    }
    #setKeyDownEvent(setGame) {
        this.#keyDownEvent = (event) => {
            const key = event.key;

            if ((!KEY.DOWN.includes(key) && !KEY.UP.includes(key)) ||
                event.repeat || (KEY.P1.includes(key) && this.#isKeyPressed.p1) ||
                (KEY.P2.includes(key) && this.#isKeyPressed.p2))
                return ;
            this.#setPlayerKeyPress(key, true);
            this.#paddleSetter.setPaddleMove(event, setGame);
        };
    }
    #setKeyUpEvent() {
        this.#keyUpEvent = (event) => {
            const key = event.key;

            if (!KEY.DOWN.includes(key) && !KEY.UP.includes(key))
                return ;
            this.#setPlayerKeyPress(key, false);
            this.#paddleSetter.setPaddleStop(event);
        }
    }
    #setPlayerKeyPress(key, isPressed) {
        if (KEY.P1.includes(key))
            this.#isKeyPressed.p1 = isPressed;
        else
            this.#isKeyPressed.p2 = isPressed;
    }
    #setGameEndEvent() {
        this.#gameEndEvent = (event) => {
            if (event.type === "click")
                navigate("/home");
            else if (event.type === "keydown") {
                if (event.key === "Esc" || event.key === "Enter")
                    navigate("/home");
            }
        }
    }
    #keyDownEvent;
    #keyUpEvent;
    #gameEndEvent;
    #isKeyPressed;
    #paddleSetter;
}

export default LocalEventHandler;
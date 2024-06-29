import {io} from "socket.io-client";
import { GAME, SOCKET } from "./constant.js";
import { GameSocketEventHandler } from "./EventHandler.js";
import RoomSocket from "../Room/RoomSocket.js";

class GameSocket extends RoomSocket {
    constructor (gameType) {
        super(gameType);
        this.#eventHandler = new GameSocketEventHandler;
    }
    sendKeyValue(value) {
        this.socket.emit(SOCKET.EVENT.KEY, value);
    }
    turnOnGameChannel(setGameData) {
        this.#eventHandler.setGameEvent(setGameData);
        this.socket.off(SOCKET.EVENT.GAME);
        this.socket.on(SOCKET.EVENT.GAME, this.#eventHandler.gameEvent);
    }
    turnOffGameChannel() {
        this.socket.off(SOCKET.EVENT.GAME, this.#eventHandler.gameEvent);
    }
    turnOnResultChannel(setGameResult) {
        this.#eventHandler.setResultEvent(setGameResult);
        this.socket.off(SOCKET.EVENT.RESULT);
        this.socket.on(SOCKET.EVENT.RESULT, this.#eventHandler.resultEvent);
    }
    turnOffResultChannel() {
        this.socket.off(SOCKET.EVENT.RESULT, this.#eventHandler.resultEvent);
    }
    sendNextGameMessage() {
        this.socket.emit(SOCKET.EVENT.NEXT_GAME);
    }
    #eventHandler;
}

export const pongSocket = new GameSocket(GAME.TYPE.PONG);
export const mttSocket = new GameSocket(GAME.TYPE.MTT);
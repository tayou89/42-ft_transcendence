import {io} from "socket.io-client";
import { GAME, SOCKET, URL_PATH } from "../Game/constant.js";
import EventHandler from "./EventHandler.js";

class Socket {
    constructor (gameType) {
        const socketOption = this.#getSocketOption(true, true, ['websocket']);

        this.#setSocket(gameType, socketOption);
        this.#eventHandler = new EventHandler;
    }
    sendRoomJoinMessage(id, title) {
        this.#socket.emit(SOCKET.EVENT.JOIN_ROOM, { pid: id, room: title });
    }
    sendRoomLeaveMessage() {
        this.#socket.emit(SOCKET.EVENT.LEAVE_ROOM);
    }
    sendKeyValue(value) {
        this.#socket.emit(SOCKET.EVENT.KEY, value);
    }
    sendReadyStatus(readyStatus) {
        this.#socket.emit(SOCKET.EVENT.READY, readyStatus);
    }
    turnOnRoomChannel(setPlayers) {
        this.#eventHandler.setRoomEvent(setPlayers);
        this.#socket.on(SOCKET.EVENT.ROOM, this.#eventHandler.roomEvent);
    }
    turnOffRoomChannel() {
        this.#socket.off(SOCKET.EVENT.ROOM, this.#eventHandler.roomEvent);
    }
    turnOnGameChannel(setGameData) {
        this.#eventHandler.setGameEvent(setGameData);
        this.#socket.on(SOCKET.EVENT.GAME, this.#eventHandler.gameEvent);
    }
    turnOffGameChannel() {
        this.#socket.off(SOCKET.EVENT.GAME, this.#eventHandler.gameEvent);
    }
    turnOnResultChannel(setGameResult) {
        this.#eventHandler.setResultEvent(setGameResult);
        this.#socket.on(SOCKET.EVENT.RESULT, this.#eventHandler.resultEvent);
    }
    turnOffResultChannel() {
        this.#socket.off(SOCKET.EVENT.RESULT, this.#eventHandler.resultEvent);
    }
    #getSocketOption(reconnection, autoConnect, transports) {
        const socketOption = { reconnection, autoConnect, transports };

        return (socketOption);
    }
    #setSocket(gameType, socketOption) {
        if (gameType === GAME.TYPE.PONG)
            this.#socket = io(URL_PATH.SOCKET.PONG, socketOption);
        else
            this.#socket = io(URL_PATH.SOCKET.MTT, socketOption);
    }
    #socket;
    #eventHandler;
}

export const pongSocket = new Socket(GAME.TYPE.PONG);
export const mttSocket = new Socket(GAME.TYPE.MTT);

export default Socket;
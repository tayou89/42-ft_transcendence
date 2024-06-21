import {io} from "socket.io-client";
import { GAME_TYPE, SOCKET, URL } from "../Game/constant.js";
import EventHandler from "./EventHandler.js";

class Socket {
    constructor (gameType) {
        const socketOption = this.#getSocketOption(false, false, ['websocket']);

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
    turnOnRoomChannel(currentPlayers, setPlayers) {
        this.#eventHandler.setRoomEvent(currentPlayers, setPlayers);

        socket.on(SOCKET.EVENT.ROOM, this.#eventHandler.roomEvent);
    }
    turnOffRoomChannel() {
        socket.off(SOCKET.EVENT.ROOM, this.#eventHandler.roomEvent);
    }
    turnOnGameChannel(currentGameData, setGameData) {
    }
    #getSocketOption(reconnection, autoConnect, transports) {
        const socketOption = { reconnection, autoConnect, transports };

        return (socketOption);
    }
    #setSocket(gameType, socketOption) {
        if (gameType === GAME_TYPE.PONG)
            this.#socket = io(URL.SOCKET.PONG, socketOption);
        else
            this.#socket = io(URL.SOCKET.MTT, socketOption);
    }
    #socket;
    #eventHandler;
}

export default Socket;
import {io} from "socket.io-client";

export const pongSocket = io("http://localhost:8001/api/pong", {
    // reconnection: false,
    // autoConnect: false,
    transports: ['websocket'],
});

export const mttSocket = io("http://localhost:8001/api/mtt", {
    reconnection: false,
    autoConnect: false,
    transports: ['websocket'],
});

export const SOCKET = {
    EVENT: {
        KEY: "key",
        ROOM: "room",
        JOIN_ROOM: "join_room",
        LEAVE_ROOM: "leave_room",
        GAME: "game",
        READY: "ready",
        RESULT: "result",
    },
    VALUE: {
        KEY: {
            UP: -1,
            DOWN: 1,
            NONE: 0,
        },
    },
    TYPE: {
        PONG: "pong",
        MTT: "mtt",
    },
}
import {io} from "socket.io-client";

export const socket = io("http://localhost:8080", {
    reconnection: false,
    autoConnect: false,
});

export const SOCKET = {
    EVENT: {
        KEY: "key",
        ROOM: "room",
        GAME: "game",
    },
    VALUE: {
        KEY: {
            UP: -1,
            DOWN: 1,
            NONE: 0,
        },
    }
}
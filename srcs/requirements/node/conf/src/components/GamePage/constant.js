import {io} from "socket.io-client";

export const socket = io("http://localhost:8080", {
    reconnection: false,
    autoConnect: false,
});

export const BOARD = {
    WIDTH: 1300,
    HEIGHT: 800,
};

export const PADDLE = {
    WIDTH: 12,
    HEIGHT: 60,
    OFFSET_X: 50,
    INITIAL_Y:  (BOARD.HEIGHT / 2) - (60 / 2),
    BORDER_RADIUS: 3,
    COLOR: "white",
	MIN_Y: 0,
	MAX_Y: BOARD.HEIGHT - 60,
    DIRECTION: {
        UP: -1,
        DOWN: 1,
        NONE: 0,
    },
    TRANSITION: "top 0.05s linear",
};

export const BALL = {
    RADIUS: 15,
    WIDTH: 30,
    HEIGHT: 30,
    COLOR: "white",
    INIT: {
        X: (BOARD.WIDTH / 2) - 15,
        Y: (BOARD.HEIGHT / 2) - 15,
    },
    TRANSITION: "top 0.1s linear, left 0.1s linear",
};

export const KEY = {
    UP: ['w', 'ArrowUp'],
    DOWN: ['s', 'ArrowDown'],
}

export const SOCKET = {
    EVENT: {
        KEY: "key",
        PADDLE: "paddle",
        BALL: "ball",
        SCORE: "score",
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
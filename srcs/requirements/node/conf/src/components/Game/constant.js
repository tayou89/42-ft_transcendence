export const BOARD = {
    WIDTH: 1300,
    HEIGHT: 800,
};

export const PADDLE = {
    WIDTH: 12,
    HEIGHT: 60,
    OFFSET_X: 50,
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
    TRANSITION: "top 0.1s linear, left 0.1s linear",
};

export const INIT = {
    BALL: {
        X: (BOARD.WIDTH / 2) - BALL.RADIUS,
        Y: (BOARD.HEIGHT / 2) - BALL.RADIUS,
    },
    PADDLE1: {
        X: PADDLE.OFFSET_X - (PADDLE.WIDTH / 2),
        Y:  (BOARD.HEIGHT / 2) - (60 / 2),
    },
    PADDLE2: {
        X: BOARD.WIDTH - (PADDLE.OFFSET_X + (PADDLE.WIDTH / 2)),
        Y:  (BOARD.HEIGHT / 2) - (60 / 2),
    }
};

export const KEY = {
    UP: ['w', 'ArrowUp'],
    DOWN: ['s', 'ArrowDown'],
    VALUE: {
        UP: -1,
        DOWN: 1,
        NONE: 0,
    }
}

export const GAME = {
    TYPE: {
        PONG: "pong",
        MTT: "mtt",
    },
    POSITION: {
        LEFT: "left",
        RIGHT: "right",
    },
    RESULT: {
        WIN: "win",
        LOSE: "lose",
    },
};

const DEFAULT_URL = "http://localhost";

const PORT = {
    BACK_API: 8000,
    SOCKET: 8001,
}
const PATH = {
    SOCKET: {
        PONG: "/api/pong",
        MTT: "/api/mtt",
    },
}

export const URL_PATH = {
    BACK_API: `${DEFAULT_URL}:${PORT.BACK_API}`,
    SOCKET: {
        PONG: `${DEFAULT_URL}:${PORT.SOCKET}${PATH.SOCKET.PONG}`,
        MTT: `${DEFAULT_URL}:${PORT.SOCKET}${PATH.SOCKET.MTT}`,
    }
}

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
}
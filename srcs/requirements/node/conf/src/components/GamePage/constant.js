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
};

export const BALL = {
    RADIUS: 7,
};

export const KEY = {
    UP: ['w', 'ArrowUp'],
    DOWN: ['s', 'ArrowDown'],
}

export const SOCKEY = {
    EVNET: {
        KEY: "key",
        PADDLE: "paddle",
        BALL: "ball",
    },
    VALUE: {
        KEY: {
            UP: -1,
            DOWN: 1,
            NONE: 0,
        },
    }
}
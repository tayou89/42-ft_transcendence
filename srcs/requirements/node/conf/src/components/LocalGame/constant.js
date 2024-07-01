export const BOARD = {
    WIDTH: 1300,
    HEIGHT: 800,
};

export const PADDLE = {
    WIDTH: 20,
    HEIGHT: 120,
    OFFSET_X: 50,
    BORDER_RADIUS: 10,
    COLOR: "white",
    DIRECTION: {
        UP: -1,
        DOWN: 1,
        NONE: 0,
    },
    TRANSITION: "top 0.05s linear",
    SPEED: 20,
    COUNT: 2,
};

export const BALL = {
    RADIUS: 15,
    WIDTH: 30,
    HEIGHT: 30,
    COLOR: "white",
    TRANSITION: "top 0.1s linear, left 0.1s linear",
    SPEED: {
        MAX: 20,
        ACCELLERATION: 0.2,
    }
};

export const INIT = {
    BALL: {
        x: (BOARD.WIDTH / 2) - BALL.RADIUS,
        y: (BOARD.HEIGHT / 2) - BALL.RADIUS,
        speed: 5,
        direction: { x: -1, y: 0 },
    },
    PADDLE1: {
        x: PADDLE.OFFSET_X - (PADDLE.WIDTH / 2),
        y:  (BOARD.HEIGHT / 2) - (PADDLE.HEIGHT / 2),
    },
    PADDLE2: {
        x: BOARD.WIDTH - (PADDLE.OFFSET_X + (PADDLE.WIDTH / 2)),
        y:  (BOARD.HEIGHT / 2) - (PADDLE.HEIGHT / 2),
    }
};

export const KEY = {
    P1: ['w', 's'],
    P2: ['ArrowUp', 'ArrowDown'],
    UP: ['w', 'ArrowUp'],
    DOWN: ['s', 'ArrowDown'],
    VALUE: {
        UP: -1,
        DOWN: 1,
        NONE: 0,
    }
}

export const END_SCORE = 3;
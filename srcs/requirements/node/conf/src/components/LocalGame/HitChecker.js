import { BOARD, PADDLE, BALL } from "./constant.js";

class HitChecker {
    static isPaddleHitWall(paddle, direction) {
        const nextPaddle = { ...paddle, y: paddle.y + direction };
        const paddleEdge = getPaddleEdge(nextPaddle);

        if (paddleEdge.bottom > BOARD.HEIGHT || paddleEdge.top < 0)
            return (true);
        else 
            return (false);
    }
    static isBallHitWall(ball) {
        const ballEdge = getBallEdge(ball);

        if (ballEdge.top < 0 || ballEdge.bottom > BOARD.HEIGHT)
            return (true);
        else
            return (false);
    }
    static isBallHitPaddle(ball, paddles) {
        const ballEdge = getBallEdge(ball);
        const paddle = ball.direction.x < 0 ? paddles[0]: paddles[1];
        const paddleEdge = getPaddleEdge(paddle);

        if (ballEdge.bottom < paddleEdge.top || ballEdge.top > paddleEdge.bottom)
            return (false);
        if (ballEdge.right < paddleEdge.left || ballEdge.left > paddleEdge.right)
            return (false);
        return (true);
    }
    static isBallHitGoalLine(ball) {
        const ballEdge = getBallEdge(ball);

        if (ballEdge.left <= 0 || ballEdge.right > BOARD.WIDTH)
            return (true);
        else
            return (false);
    }
}

function getBallEdge(ball) {
    return ({
        left: ball.x,
        right: ball.x + BALL.RADIUS * 2,
        top: ball.y,
        bottom : ball.y + BALL.RADIUS * 2,
    });
}

function getPaddleEdge(paddle) {
    return ({
        left: paddle.x,
        right: paddle.x + PADDLE.WIDTH,
        top: paddle.y,
        bottom: paddle.y + PADDLE.HEIGHT,
    });
}

export default HitChecker;
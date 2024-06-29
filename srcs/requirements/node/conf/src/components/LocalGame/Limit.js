import { LIMIT } from "../RemoteGame/constant.js";

class Limit {
    static checkPaddle(paddleY, direction) {
        const nextPaddleY = paddleY + direction;

        if (nextPaddleY > LIMIT.PADDLE.MAX.Y || nextPaddleY < LIMIT.PADDLE.MIN.Y)
            return (true);
        else 
            return (false);
    }
}

export default Limit;
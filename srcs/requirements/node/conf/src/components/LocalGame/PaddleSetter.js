import { MyReact } from "../../MyReact/MyReact.js";
import { KEY, PADDLE } from "./constant.js";
import HitChecker from "./HitChecker.js";

class PaddleSetter {
    constructor () {
        this.#paddleLoop = [];
    }
    setPaddleMove(event, setGame) {
        const direction = getPaddleDirection(event.key) * PADDLE.SPEED;
        const paddleIndex = getPaddleIndex(event.key);

        this.#paddleLoop[paddleIndex] = setInterval(() => {
            setGame((prev) => {
            if (HitChecker.isPaddleHitWall(prev.paddle[paddleIndex], direction))
                return ({ ...prev });
            else 
                return ({ ...prev, paddle: prev.paddle.map((paddle, index) => 
                    index === paddleIndex ? { ...paddle, y: paddle.y + direction } : { ...paddle })
                });
            });
        }, 30);
    }
    setPaddleStop(event) {
        const paddleIndex = getPaddleIndex(event.key);

        if (paddleIndex < 0)
            return ;
        clearInterval(this.#paddleLoop[paddleIndex]);
        this.#paddleLoop[paddleIndex] = undefined;
    }
    #paddleLoop;
}

function getPaddleDirection(key) {
    if (KEY.UP.includes(key))
        return (PADDLE.DIRECTION.UP);
    else if (KEY.DOWN.includes(key))    
        return (PADDLE.DIRECTION.DOWN);
    else
        return (PADDLE.DIRECTION.NONE);
}

function getPaddleIndex(key) {
    if (KEY.P1.includes(key))
        return (0);
    else if (KEY.P2.includes(key))
        return (1);
    else
        return (-1);
}

export default PaddleSetter;
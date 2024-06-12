import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import {BOARD, PADDLE, KEY} from "./constant.js";
import {io} from "socket.io-client";

const socket = io("http://localhost:8080", {
    reconnection: false,
    autoConnect: false,
});

function Paddle({id}) {
    const [paddleY, setPaddleY] = useState(PADDLE.INITIAL_Y);
    const style = getStyle(paddleY, id);

    console.log("paddleY:", paddleY)
    getEffect(paddleY, setPaddleY);
    return (
        <div id={id} style={style}></div>
    );
}

function getStyle(valueY, id){
	const style = `
        position: absolute;
        background-color: ${PADDLE.COLOR};
        width: ${PADDLE.WIDTH}px;
        height: ${PADDLE.HEIGHT}px;
        left: ${getX(id)}px;
        top: ${valueY}px;
        border-radius: ${PADDLE.BORDER_RADIUS}px;
        background: linear-gradient(to ${getPositoin(id)}, ${PADDLE.COLOR} 50%, black 100%);
		transition: top 0.05s linear;
	`
    return (style);
}

function getEffect(paddleY, setPaddleY) {
    useEffect(() => {
        let moveDirection = 0;
        let animationFrameId = null;
        const updatePosition = () => {
            const newPaddleY = paddleY + moveDirection * 16;

            if (moveDirection !== PADDLE.DIRECTION.NONE){
                if (newPaddleY >= PADDLE.MIN_Y && newPaddleY <= PADDLE.MAX_Y)
                    setPaddleY(newPaddleY);
            }
            animationFrameId = requestAnimationFrame(updatePosition);
        };
        const handleKeyDown = (event) => {
            if (KEY.UP.includes(event.key))
                moveDirection = -1;
            else if (KEY.DOWN.includes(event.key))
                moveDirection = 1;
        };
        const handleKeyUp = (event) => {
            if (KEY.UP.includes(event.key) || KEY.DOWN.includes(event.key))
                moveDirection = 0;
        }
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        animationFrameId = requestAnimationFrame(updatePosition);
        return (() => {
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        });
    }, [paddleY]);
}

function getX(id) {
    if (id === "paddle1")
        return (PADDLE.OFFSET_X - (PADDLE.WIDTH / 2));
    else
        return (BOARD.WIDTH - (PADDLE.OFFSET_X + (PADDLE.WIDTH / 2)));
}

function getPositoin(id) {
    if (id === "paddle1")
        return ("left");
    else
        return ("right")
}

export default Paddle;
import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import {BOARD, PADDLE, KEY, SOCKET, socket} from "./constant.js";

function Paddle({id}) {
    const [paddleY, setPaddleY] = useState(PADDLE.INITIAL_Y);
    const style = getStyle(paddleY, id);

    getEffect(paddleY, setPaddleY, id);
    return (
        <div id={id} style={style}></div>
    );
}

function getStyle(valueY, id){
    const shadow_x = (getPositoin(id) === "left") ? "+" : "-";
	const style = `
        position: absolute;
        background-color: ${PADDLE.COLOR};
        width: ${PADDLE.WIDTH}px;
        height: ${PADDLE.HEIGHT}px;
        left: ${getX(id)}px;
        top: ${valueY}px;
        border-radius: ${PADDLE.BORDER_RADIUS}px;
        box-shadow: inset ${shadow_x}3px -3px 3px 0px rgba(0, 0, 0, 0.5);
		transition: ${PADDLE.TRANSITION};
	`;
    return (style);
}

function getEffect(paddleY, setPaddleY, id) {
    let newY = paddleY;

    useEffect(() => {
        let animationFrameId = null;
        const updatePosition = () => {
            if (newY != paddleY && newY >= PADDLE.MIN_Y && newY <= PADDLE.MAX_Y)
                setPaddleY((_) => newY);
            animationFrameId = requestAnimationFrame(updatePosition);
        };
        const handlePaddleEvent = ({ p1, p2 }) => {
            newY = (id === "paddle1") ? p1 : p2;
        };

        animationFrameId = requestAnimationFrame(updatePosition);
        socket.on(SOCKET.EVENT.PADDLE, handlePaddleEvent);
        return (() => {
            socket.off(SOCKET.EVENT.PADDLE);
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
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import {PADDLE, INIT, SOCKET, socket} from "./constant.js";

function Paddle({ id, position }) {
    const paddle = JSON.parse(position);
    const paddleY = (id === "paddle1") ? paddle.p1 : paddle.p2;
    const style = getStyle(paddleY, id);

    return (
        <div id={id} style={style}></div>
    );
}

function getStyle(valueY, id){
    const x = (id === "paddle1") ? INIT.PADDLE1.X : INIT.PADDLE2.X;
    const shadow_x = (getPositoin(id) === "left") ? "+" : "-";
	const style = `
        position: absolute;
        background-color: ${PADDLE.COLOR};
        width: ${PADDLE.WIDTH}px;
        height: ${PADDLE.HEIGHT}px;
        left: ${x}px;
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

function getPositoin(id) {
    if (id === "paddle1")
        return ("left");
    else
        return ("right")
}

export default Paddle;
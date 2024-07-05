import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { PADDLE } from "./constant.js";

function Paddle({ id, paddle }) {
    const style = getStyle(paddle, id);

    return (
        <div id={id} style={style}></div>
    );
}

function getStyle(paddle, id){
    const shadow_x = (id === "paddle1") ? "+" : "-";
	const style = `
        position: absolute;
        background-color: ${PADDLE.COLOR};
        width: ${PADDLE.WIDTH}px;
        height: ${PADDLE.HEIGHT}px;
        left: ${paddle.x}px;
        top: ${paddle.y}px;
        border-radius: ${PADDLE.BORDER_RADIUS}px;
        box-shadow: inset ${shadow_x}3px -3px 3px 0px rgba(0, 0, 0, 0.5);
		transition: ${PADDLE.TRANSITION};
	`;
    return (style);
}

export default Paddle;
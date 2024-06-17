import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import {PADDLE, INIT } from "./constant.js";

function Paddle({ id, paddle }) {
    const paddleY = (id === "paddle1") ? paddle.p1 : paddle.p2;
    const style = getStyle(paddleY, id);

    return (
        <div id={id} style={style}></div>
    );
}

function getStyle(valueY, id){
    const x = (id === "paddle1") ? INIT.PADDLE1.X : INIT.PADDLE2.X;
    const shadow_x = (id === "paddle1") ? "+" : "-";
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

export default Paddle;
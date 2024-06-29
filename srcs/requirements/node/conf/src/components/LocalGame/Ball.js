import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { BALL } from "../RemoteGame/constant.js";

function Ball({ id, ball }) {
    const style = getStyle(ball.x, ball.y);

    return (
        <div id={id} style={style}></div>
    );
}

function getStyle(ballX, ballY) {
    const style = `
        position: absolute;
        background-color: ${BALL.COLOR};
        top: ${ballY}px;
        left: ${ballX}px;
        width: ${BALL.WIDTH}px;
        height: ${BALL.HEIGHT}px;
        border-radius: ${BALL.RADIUS}px;
        box-shadow: inset -5px -5px 5px 0px rgba(0, 0, 0, 0.25);
        transition: 'top 0.1s linear, left 0.1s linear',
    `;
    return (style);
}

export default Ball;
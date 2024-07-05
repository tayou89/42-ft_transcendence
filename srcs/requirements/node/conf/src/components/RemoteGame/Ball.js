import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { BALL } from "./constant.js";

function Ball({ id, ball }) {
    const style = getStyle(ball);

    return (
        <div id={id} style={style}></div>
    );
}

function getStyle(ball) {
    const style = `
        background-image: url('${ ball.image }');
        background-size: cover;
        position: absolute;
        top: ${ ball.y }px;
        left: ${ ball.x }px;
        width: ${ BALL.WIDTH }px;
        height: ${ BALL.HEIGHT }px;
        border-radius: ${ BALL.RADIUS }px;
        box-shadow: inset -5px -5px 5px 0px rgba(0, 0, 0, 0.25);
        transition: 'top 0.1s ease-out, left 0.1s ease-out',
    `;
    return (style);
}

export default Ball;
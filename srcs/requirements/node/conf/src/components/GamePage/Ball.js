import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import { BALL, SOCKET, socket } from "./constant.js";

function Ball({id}) {
    const [ballX, setBallX] = useState(BALL.INIT.X);
    const [ballY, setBallY] = useState(BALL.INIT.Y);
    const style = getStyle(ballX, ballY);

    getEffect({x: ballX, y: ballY, setX: setBallX, setY: setBallY});
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

function getEffect(ball) {
    useEffect(() => {
        let animationFrameId = null;
        let [newX, newY] = [ball.x, ball.y];
        const updatePosition = () => {
            if (newX != ball.x)
                ball.setX(() => newX);
            if (newY != ball.y)
                ball.setY(() => newY);
            animationFrameId = requestAnimationFrame(updatePosition);
        };
        const handleBallEvent = (([ x, y ]) => {
            newX = x;
            newY = y;
        });

        socket.on(SOCKET.EVENT.BALL, handleBallEvent);
        animationFrameId = requestAnimationFrame(updatePosition);
        return (() => {
            socket.off(SOCKET.EVENT.BALL);
            cancelAnimationFrame(animationFrameId);
        });
    }, [ball.x, ball.y])
}

export default Ball;
import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
import { BALL } from "./constant.js";

function Ball({id}) {
    const [ballX, setBallX] = useState(BALL.INIT.X);
    const [ballY, setBallY] = useState(BALL.INIT.Y);
    const style = getStyle(ballX, ballY);

    console.log("ballX:", ballX);
    console.log("ballY:", ballY);
    getEffect({x: ballX, y: ballY, setX: setBallX, setY: setBallY});
    return (
        <div id="ball" style={style}></div>
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
        background: ${BALL.BACKGROUND};
        transition: 'top 0.1s linear, left 0.1s linear',
    `;

    return (style);
}

function getEffect(ball) {
    useEffect(() => {
        let animationFrameId = null;
        let moveX = 0;
        let moveY = 0;
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'w':
                    console.log("This key is w");
                    moveY = -16;
                    break ;
                case 's':
                    console.log("This key is s");
                    moveY = 16;
                    break ;
                case 'a':
                    console.log("This key is a");
                    moveX = -16;
                    break ;
                case 'ArrowRight':
                    console.log("This key is d");
                    moveX = 16;
                    break ;
                default :
                    break ;
            }
        }
        const updatePosition = () => {
            if (moveX != 0)
                ball.setX(ball.x + moveX);
            if (moveY != 0)
                ball.setY(ball.y + moveY);
            animationFrameId = requestAnimationFrame(updatePosition);
        }
        document.addEventListener("keydown", handleKeyDown);
        animationFrameId = requestAnimationFrame(updatePosition);
        return (() => {
            document.removeEventListener("keydown", handleKeyDown);
            cancelAnimationFrame(animationFrameId);
        });
    }, [ball.x, ball.y])
}

export default Ball;
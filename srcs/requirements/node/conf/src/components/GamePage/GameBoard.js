import { useEffect, useState, MyReact } from "../..//MyReact/MyReact.js";
// import Ball from "./Ball.js";
import PaddleStyle from "./PaddleStyle.js";
import "../../css/game-page/game-board.css";
import {BOARD, PADDLE, BALL} from "./constant.js";

function PlayerSlot({id}) {
    return (
        <div className="col" id={id}>
            <div className="row">image</div>
            <div className="row">name</div>
            <div className="row">level</div>
        </div>
    );
}

function paddleEffect([paddleY, setPaddleY]) {
	useEffect(() => {
		let animationFrameId = null;
		let direction = 0;
		const updatePaddlePosition = () => {
			if (direction !== 0) {
				const newPaddleY = paddleY + direction * 4;

				if (newPaddleY >= PADDLE.MIN_Y && newPaddleY <= PADDLE.MAX_Y)
					setPaddleY(newPaddleY);
			}
			animationFrameId = requestAnimationFrame(updatePaddlePosition);
		};
		const handleKeyDown = (event) => {
			if (event.key === 'w')
				direction = -1;
			else if (event.key === 's')
				direction = 1;
		};
		const handleKeyUp = (event) => {
			if (event.key === 'w' || event.key === 's')
				direction = 0;
		};
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		animationFrameId = requestAnimationFrame(updatePaddlePosition);
		return (() => {
			cancelAnimationFrame(animationFrameId);
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		});
	}, [paddleY])

}


function Paddle({id}) {
	const [paddleY, setPaddleY] = useState(PADDLE.INITIAL_Y);
    const paddleStyle = new PaddleStyle(id);
    const style = paddleStyle.getStyle(paddleY);

	paddleEffect([paddleY, setPaddleY]);
	// useEffect(() => {
	// 	const handleKeyDown = (event) => {
	// 		if (event.key === 'w' && paddleY > PADDLE.MIN_Y)
	// 			setPaddleY(paddleY - 3);
	// 		else if (event.key === 's' && paddleY < PADDLE.MAX_Y)
	// 			setPaddleY(paddleY + 3);
	// 	};
	// 	document.addEventListener("keydown", handleKeyDown);
	// 	return (() => {
	// 		document.removeEventListener("keydown", handleKeyDown);
	// 	});
	// }, [paddleY])

    return (
        <div id={id} style={style}></div>
    );
}

function Ball() {
    const ball = document.getElementById("ball");

    return (
        <div id="ball"></div>
    );
}

function Board() {
    return (
        <div className="col" id="board">
            <Ball />
            <Paddle id="paddle1"/>
            <Paddle id="paddle2"/>
        </div>
    );
}

function GameBoard() {
    return (
        <div className="row" id="game-board">
            <PlayerSlot id="player1" />
            <Board />
            <PlayerSlot id="player2" />
        </div>
    );
}

export default GameBoard;
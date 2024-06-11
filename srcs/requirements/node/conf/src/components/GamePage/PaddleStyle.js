import {BOARD, PADDLE} from "./constant.js";

class PaddleStyle {
    constructor(id) {
        this.#setPaddleNumber(id);
        this.#setX(id);
        this.#y = PADDLE.INITIAL_Y;
        this.#width = PADDLE.WIDTH;
        this.#height = PADDLE.HEIGHT;
        this.#radius = PADDLE.BORDER_RADIUS;
        this.#color = PADDLE.COLOR;
    }
    #setX(id) {
        if (id === "paddle1")
            this.#x = PADDLE.OFFSET_X - (PADDLE.WIDTH / 2);
        else    
            this.#x = BOARD.WIDTH - (PADDLE.OFFSET_X + (PADDLE.WIDTH / 2));
    }
    #setY(value = this.#y) {
        this.#y = value;
    }
    #setPaddleNumber(id){
        if (id === "paddle1")
            this.#paddleNumber = 1;
        else    
            this.#paddleNumber = 2;
    }
    getStyle(valueY = undefined) {
        this.#setY(valueY);
        const gradientDirection = (this.#paddleNumber === 1 ? "left" : "right");
		const style = `
            position: absolute;
            background-color: ${this.#color};
            width: ${this.#width}px;
            height: ${this.#height}px;
            left: ${this.#x}px;
            top: ${this.#y}px;
            border-radius: ${this.#radius}px;
            background: linear-gradient(to ${gradientDirection}, ${this.#color} 50%, black 100%);
			transition: top 0.05s linear;
		`
        return (style);
    }
    #x;
    #y;
    #width;
    #height;
    #radius;
    #color;
    #paddleNumber;
}

export default PaddleStyle;
import {BOARD, PADDLE} from "./constant.js";

class Paddle {
    constructor (playerNumber) {
        if (playerNumber != 1 && playerNumber != 2)
            throw Error("Invalid player number: " + playerNumber);
        this.#playerNumber = playerNumber;
        this.#setX(playerNumber);
        this.setY(PADDLE.INITIAL_Y);
        this.#width = PADDLE.WIDTH;
        this.#height = PADDLE.HEIGHT;
        this.#radius = PADDLE.WIDTH / 2;
    }

    drawOnCanvas(canvas) {
        const context = canvas.getContext("2d");
        const gradient = this.#createGradient(context);

        context.save();
        context.fillStyle = gradient;
        this.#drawBody(context);
        this.#drawArcTop(context);
        this.#drawArcBottom(context);
        context.restore();
    }

    setY(value) {
        if ((value < (PADDLE.HEIGHT / 2)) || value > (BOARD.HEIGHT - (PADDLE.HEIGHT / 2)))
            throw Error("Invalue y for paddle: " + value);
        this.#y = value;
    }

    #setX(playerNumber) {
        if (playerNumber == 1)
            this.#x = PADDLE.OFFSET_X;
        else
            this.#x = BOARD.WIDTH - PADDLE.OFFSET_X;
    }

    #drawBody(context) {
        const x = this.#x - (this.#width / 2);
        const y = this.#y - ((this.#height / 2) - this.#radius);
        const width = this.#width;
        const height = this.#height - (2 * this.#radius);

        context.beginPath();
        context.rect(x, y, width, height);
        context.fill();
    }

    #drawArcTop(context) {
        const x = this.#x;
        const y = this.#y - (this.#height / 2) + this.#radius;
        const radius = this.#radius;

        context.beginPath();
        context.arc(x, y, radius, Math.PI, Math.PI * 2);
        context.fill();
    }

    #drawArcBottom(context) {
        const x = this.#x;
        const y = this.#y + (this.#height / 2) - this.#radius;
        const radius = this.#radius;

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI);
        context.fill();
    }

    #createGradient(context) {
        const x1 = (this.#playerNumber === 1) ? this.#x + this.#width : this.#x - this.#width;
        const y1 = this.#y; 
        const x2 = (this.#playerNumber === 1) ? this.#x - this.#width : this.#x + this.#width;
        const y2 = this.#y;
        const gradient = context.createLinearGradient(x1, y1, x2, y2);

        gradient.addColorStop(0.5, "white");
        gradient.addColorStop(1, "black");
        return (gradient);
    }
    
    #x;
    #y;
    #width;
    #height;
    #radius;
    #playerNumber;
}

export default Paddle;
import { BALL } from "./constant.js";

class Ball {
    constructor (x, y) {
        this.#x = x;
        this.#y = y;
        this.#radius = BALL.RADIUS;
    }
    drawOnCanvas(canvas){
        const context = canvas.getContext("2d");
        const gradient = 
            context.createRadialGradient(this.#x, this.#y, 1, this.#x, this.#y, 20);
        
        context.save();
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, "black");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.#x, this.#y, this.#radius, 0,  Math.PI * 2, false);
        context.fill();
        context.restore();
    }
    #x;
    #y;
    #radius;
}

export default Ball;
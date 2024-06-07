import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";

// size : lg sm ''
function Btn({ size, text, color1 = "primary", color2 = "secondary", onClickFunc }) {
	function MouseEnter(event) {
		event.target.classList.remove(`btn-outline-${color1}`);
		event.target.classList.remove(`bg-${color2}`);
		event.target.classList.add(`bg-${color1}`);
	}
	function MouseLeave(event) {
		event.target.classList.add(`btn-outline-${color1}`);
		event.target.classList.add(`bg-${color2}`);
		event.target.classList.remove(`bg-${color1}`);
	}
	return (
		<button className={`btn btn-${size} bg-${color2} btn-outline-${color1} text-white`} onClick={onClickFunc} onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
			{text}
		</button>
	);
}

export default Btn;

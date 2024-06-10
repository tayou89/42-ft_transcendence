import { useEffect, useState, MyReact } from "../MyReact/MyReact.js";
import Navbar from "./Navbar.js";
import isLogin from "./utility/isLogin.js";

function Interchange() {
	MyReact.useEffect(() => {
		isLogin();
	}, []);
	return (
		<div className="container text-light fs-1 text-center">
			42Pong
		</div>
	);
}

export default Interchange;

import { useEffect, useState, MyReact } from "../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../MyReact/MyReactRouter.js";
import Navbar from "./Navbar.js";
import Btn from "./utility/Btn.js";

function clickLoginBtn() {
	window.location.href = "http://localhost:8000/api/login/";
}

function Login() {
	return (
		<div>
			<Navbar/>
			<h1 className="container-fluid text-white text-center mt-5 mb-5 p-5 display-1">
				42 Pong
			</h1>
			<div className="container col-sm-4 mt-5 mb-5 pt-5">
				<div className="d-grid">
					<Btn size="lg" text="Login with 42" onClickFunc={clickLoginBtn} />
				</div>
			</div>
		</div>
	);
}

export default Login;
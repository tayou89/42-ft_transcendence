import { useEffect, useState, MyReact } from "../MyReact/MyReact.js";
import { navigate } from "../MyReact/MyReactRouter.js";
import getMyData from "./utility/getMyData.js";

function Interchange() {
	MyReact.useEffect(async () => {
		try {
			const data = await getMyData();
			navigate("/home");
		} catch (error) {
			console.log("Interchange Error: ", error);
			navigate("/login");
		}
	}, []);
	return (
		<div className="container text-light fs-1 text-center">
			42Pong
		</div>
	);
}

export default Interchange;

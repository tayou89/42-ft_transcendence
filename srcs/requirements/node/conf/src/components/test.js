import MyReact from "../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../MyReact/MyReactRouter.js";
import Navbar from "./Navbar.js";
import Btn from "./Btn.js";

function test_btn(event) {
	const url = "http://localhost:8000/api/users/";

	console.log("you pushed test button!");
}

function Test() {
	const name = "byejeon";
	return (
		<div>
			<Navbar name={name} />
			<Btn size="lg" text="test" onClickFunc={test_btn} />
			{/* <form id="login-form">
				<input
					required
					maxlength="15"
					type="text"
					placeholder="방 이름"
				/>
				<Btn size="" text="Create Room" onClickFunc={createRoomBtn} />
			</form> */}
		</div>
	);
}

export default Test;
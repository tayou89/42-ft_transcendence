import { navigate } from "../../MyReact/MyReactRouter";

function logout() {
	fetch("http://localhost:8000/api/logout", {
		method: 'POST',
		credentials: 'include'
	});
	navigate("/login");
}

export default logout;
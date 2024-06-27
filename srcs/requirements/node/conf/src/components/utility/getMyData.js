import MyReact from "../../MyReact/MyReact.js";
import logout from "./logout.js";
import tokenRefresh from "./tokenRefresh.js";

async function getMyData() {
	try {
		const response = await fetch("http://localhost:8000/api/me", {
			method: 'GET',
			credentials: 'include'
		});
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 401) {
			return await tokenRefresh(getMyData);
		} else {
			return Promise.reject({ reason: "unknown" });
		}
	} catch (error) {
		return Promise.reject({ reason: "network" });
	}
}

export default getMyData;
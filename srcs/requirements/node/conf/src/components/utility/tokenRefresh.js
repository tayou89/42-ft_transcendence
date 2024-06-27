import { navigate } from "../../MyReact/MyReactRouter";

async function tokenRefresh(workingFunction) {
	try {
		const response = await fetch("http://localhost:8000/api/token/refresh", {
			method: 'POST',
			credentials: 'include'
		});
		if (response.status === 200) {
			return await workingFunction();
		} else if (response.status === 401) {
			return Promise.reject({ reason: "refresh failed" });
		} else {
			return Promise.reject({ reason: "unknown" });
		}
	} catch (error) {
		return Promise.reject({ reason: "network" });
	}
}

export default tokenRefresh;
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
			return Promise.reject("unknown");
		}
	} catch (error) {
		console.log("getMyData Error: ", error);
		return Promise.reject(error);
	}
}

export default getMyData;
import tokenRefresh from "./tokenRefresh.js";

async function getMyData(retryCount = 0) {
	try {
		const response = await fetch("/user/api/me", {
			method: 'GET',
			credentials: 'include'
		});
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 401 && retryCount < 2) {
			return await tokenRefresh(async () => getMyData(retryCount + 1));
		} else {
			return Promise.reject("unknown");
		}
	} catch (error) {
		console.log("getMyData Error: ", error);
		return Promise.reject(error);
	}
}

export default getMyData;
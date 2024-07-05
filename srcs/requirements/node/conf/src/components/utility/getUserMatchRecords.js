import tokenRefresh from "../utility/tokenRefresh.js";

async function getUserMatchRecords(userId, retryCount = 0) {
	try {
		const response = await fetch(`/user/api/users/${userId}/matches/`, {
			method: 'GET',
			credentials: 'include'
		});
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 401 && retryCount < 2) {
			return await tokenRefresh(async () => await getUserMatchRecords(userId, retryCount + 1));
		} else {
			return Promise.reject("unknown");
		}
	} catch (error) {
		console.log("getUserMatchRecords Error: ", error);
		return Promise.reject(error);
	}
}

export default getUserMatchRecords;
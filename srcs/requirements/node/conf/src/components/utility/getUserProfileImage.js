import tokenRefresh from "./tokenRefresh";

async function getUserProfileImage(id, retryCount = 0) {
	try {
		const response = await fetch(`/user/api/users/${id}/avatar/`, { method: 'GET', credentials: 'include' });
		if (response.status === 200) {
			const blob = await response.blob();
			return URL.createObjectURL(blob);
		} else if (response.status === 401 && retryCount < 2) {
			return await tokenRefresh(async () => await getUserProfileImage(id, retryCount + 1));
		} else {
			return Promise.reject("unknown");
		}
	} catch (error) {
		console.log("getUserProfileImage Error: ", error);
		return Promise.reject(error);
	}
}

export default getUserProfileImage;
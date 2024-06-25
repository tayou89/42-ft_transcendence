//return Promise {success : true / false}
async function fetchTokenRefresh() {
	try {
		const response = await fetch("http://localhost:8000/api/token/reafresh", {
			method: 'POST',
			credentials: 'include'
		});
		if (response.status === 200) {
			const data = await response.json();
			return data;
		} else {
			const error = await response.json();
			return Promise.reject(error);
		}
	} catch (error) {
		return Promise.reject({ reason: "network" });
	}
}

export default fetchTokenRefresh;
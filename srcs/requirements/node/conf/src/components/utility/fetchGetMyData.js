import MyReact from "../../MyReact/MyReact.js";

async function fetchGetMyData() {
	try {
		const response = await fetch("http://localhost:8000/api/me", {
			method: 'GET',
			credentials: 'include'
		});
		if (response.status === 200) {
			const data = await response.json();
			return (data);
		} else if (response.status == 401) {//access token 에러
			return Promise.reject({ reason: "access token refused" });
		} else {//unknown 에러
			return Promise.reject({ reason: "unknown" });
		}
	} catch (error) { //네트워크 에러
		return Promise.reject({ reason: "network" });
	}
}

export default fetchGetMyData;
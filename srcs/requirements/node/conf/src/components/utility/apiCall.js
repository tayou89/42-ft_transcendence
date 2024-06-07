import getCookieValue from "./getCookieValue.js";

function apiCall(url) {
	let jwt = getCookieValue("jwt");
	if (jwt === null) {//jwt가 없을 경우
		console.log("no jwt");
		const refreshToken = getCookieValue("refresh");
		if (refreshToken === null) {//jwt가 없는데 리프래시 토큰이 없을 경우
			console.log("no refresh");
			console.log("go to login page");
		} else {//jwt가 없는데 리프래시 토큰이 있을 경우
			console.log("yes refresh");
			const refreshUrl = "http://localhost:8000/api/token/refresh/";//재발급 주소
			return (
				fetch(refreshUrl, {//jwt 재발급 요청
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ refresh_token: refreshToken })
				})
					.then(response => response.json())
					.then(data => {
						document.cookie = `jwt=${data.token}`;
						document.cookie = `refresh=${data.refresh}`;
					})
					.then(() => fetch(url, {
						headers: {
							'Authorization': `Bearer ${getCookieValue("jwt")}`
						}
					}))
					.catch(error => { console.log(error, "go to login page") })
			)
		}
	} else {//jwt가 있을 경우
		console.log("yes jwt");
		return (fetch(url, {
			headers: {
				'Authorization': `Bearer ${jwt}`
			}
		})
			.then(response => response.json()))
			.catch(error => { console.log(error, "go to login page") });
	}
}
export default apiCall;

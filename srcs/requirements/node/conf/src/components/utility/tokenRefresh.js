function tokenRefresh(refreshApiUrl) {
	fetch(refreshApiUrl, {//refreshApi 요청
		method: 'POST',
		credentials: 'include'
	})
		.then(response => {
			console.log(response);
			if (response.status === 204) {
				navigate("/home");//access token 재발급 성공했으니 홈으로
			} else {
				navigate("/login");//로그인 페이지로.
			}
		})
		.catch(error => {
			console.log(error);
			navigate("/login");
		});
}

export default tokenRefresh;
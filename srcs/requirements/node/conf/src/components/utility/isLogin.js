import { navigate } from "../../MyReact/MyReactRouter";
import tokenRefreshAndGoTo from "./tokenRefreshAndGoTo";

function isLogin() {
	const myInfoApiUrl = "http://localhost:8000/api/me";
	fetch(myInfoApiUrl, {//api 요청
		method: 'GET',
		credentials: 'include'
	})
		.then(response => response.json())//요청 성공 시
		.then(data => new Promise((resolve, reject) => {
			if (data.detail === undefined) {//로그인 성공 시
				navigate("/home");//로그인 성공 시 홈으로 감
			} else {//로그인 실패 시
				resolve("/home");
				//login fail 프로미스 리턴. 토큰 refresh 요청하러 감
			}
		}))
		.then(successGoTo => {
			tokenRefreshAndGoTo(successGoTo);
		})
		.catch(error => {//요청 실패 시
			console.log("in isLogin function", error);
			navigate("/login");
		})
}

export default isLogin;
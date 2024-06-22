import { useState, MyReact } from "../MyReact/MyReact.js";
import { navigate } from "../MyReact/MyReactRouter.js";

function EmailOTP() {
	const apiUrl = "http://localhost:8000/api/otp";
	function onClickSubmit(event) {
		event.preventDefault();
		const input = event.target.parentNode.querySelector("input");
		fetch(apiUrl, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json' // 보낼 데이터의 형식 지정
			},
			body: JSON.stringify({
				code: input.value
			})
		})
			.then(response => response.json())
			.then(data => {
				if (data.result === "success") {
					navigate("/");
				} else {
					alert(data.result);
				}
			})
			.catch(error => console.log("in EmailOTP function", error));
	}
	return (
		<div className="text-light text-center">
			<div className="py-5"></div>
			<div className="container fs-1 py-5">
				42 Pong
			</div>
			<div className="container">
			</div>
			<div className="container">42Seoul에 연동된 이메일로 인증코드를 보냈습니다.</div>
			<div className="container">6자리 인증코드를 입력하세요.</div>
			<form className="container my-1 py-1">
				<input className="" type="text" placeholder="message you received" maxLength={6} />
				<button className="btn btn-primary btn-sm" onClick={onClickSubmit}>Submit</button>
			</form>
		</div>
	);
}

export default EmailOTP
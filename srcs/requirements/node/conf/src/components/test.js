import MyReact from "../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../MyReact/MyReactRouter.js";


// size : lg sm ''
function Btn({ size, text, color1 = "primary", color2 = "secondary", onClickFunc }) {
	function MouseEnter(event) {
		event.target.classList.remove(`btn-outline-${color1}`);
		event.target.classList.remove(`bg-${color2}`);
		event.target.classList.add(`bg-${color1}`);
	}
	function MouseLeave(event) {
		event.target.classList.add(`btn-outline-${color1}`);
		event.target.classList.add(`bg-${color2}`);
		event.target.classList.remove(`bg-${color1}`);
	}
	return (
		<button className={`btn btn-${size} bg-${color2} btn-outline-${color1} text-white`} onClick={onClickFunc} onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
			{text}
		</button>
	);
}

function clickLoginBtn() {
	window.location.href = "http://localhost:8000/api/login/";
}

function getQueryParams() {
	const params = new URLSearchParams(window.location.search);
	return {
		token: params.get('token'),
		refresh: params.get('refresh')
	};
}

function storeTokens(token, refresh) {
	localStorage.setItem('accessToken', token);
	localStorage.setItem('refreshToken', refresh);
}

function Login_test() {
	const queryParams = getQueryParams();
	if (queryParams.token && queryParams.refresh) {
		storeTokens(queryParams.token, queryParams.refresh);
		window.history.replaceState({}, document.title, "/"); // URL에서 토큰 제거
	}
	return (
		<div>
			<Test.Navbar_test name="byejeon" />
			<h1 className="container-fluid text-white text-center mt-5 mb-5 p-5 display-1">
				42 Pong
			</h1>
			<div className="container col-sm-4 mt-5 mb-5 pt-5">
				<div className="d-grid">
					<Btn size="lg" text="Login with 42" onClickFunc={clickLoginBtn} />
				</div>
			</div>
		</div>
	);
}

function Navbar_test({ name }) {
	return (
		<div className="container-fluid border-bottom text-center my-1">
			<div className="container my-2">
				<div className="row">
					<div className="container col fs-3">
						<Link to="/" className="navbar-brand ps-2 text-light">42 Pong</Link>
					</div>
					<div className="container col fs-5">
						<Link to="/login" className="navbar-brand ps-2 text-light">login</Link>
					</div>
					<div className="container col fs-5">
						<Link to="/test" className="navbar-brand ps-2 text-light">test</Link>
					</div>
					<div className="container col-3 my-2 text-end">
						<img className="rounded-circle"
							width="30" height="30"
							src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
						<Link to="/profile" className="navbar-brand ps-2 text-light">{name}</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

function Home_test() {
	const name = "byejeon";
	return (
		<div>
			<Test.Navbar_test name={name} />
			<div className="container text-light">
				<div className="container my-2 fs-3">
					Loby
				</div>
				<div className="row">
					<div className="col-md-5">
						<div className="container mb-3 pt-2 pb-2 border-top border-bottom">
							<div className="container mt-1 ">User Simple Profile</div>
						</div>
						<div className="container mt-3 mb-3 pt-2 pb-2 border-top border-bottom">
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
						</div>
					</div>
					<div className="col-md-7">
						<div className="container pt-2 pb-2 border-top border-bottom">
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function UserPage_test() {
	const name = "byejeon";
	return (
		<div>
			<Test.Navbar_test name="byejeon" />
			<div className="container text-light">
				<div className="container">
					<div className="row">
						<div className="col">
							<div className="container mt-2 fs-3">
								User Info
							</div>
						</div>
						<div className="col">
							<div className="container text-end my-2 mx-2">
								<Btn size="sm" text="Back" color1="secondary" color2="danger" onClickFunc={null} />
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row border-top border-bottom">
						<div className="col-md-4">
							<div className="container m-1 text-center">
								<img className="rounded-circle"
									width="120" height="120"
									src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
								<div className="container mt-1 text-center">{name}</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="container m-1 text-center">
								<div className="row mt-1 mb-1">
									<div className="col-4">Level</div>
									<div className="col-2">:</div>
									<div className="col-6">10</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Exp</div>
									<div className="col-2">:</div>
									<div className="col-6">1000/3000</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Total</div>
									<div className="col-2">:</div>
									<div className="col-6">42</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Win</div>
									<div className="col-2">:</div>
									<div className="col-6">25</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Lose</div>
									<div className="col-2">:</div>
									<div className="col-6">17</div>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="container m-1 text-center">
								<div className="row mt-1 mb-1">
									<div className="col-4">Tourn.</div>
									<div className="col-2">:</div>
									<div className="col-6 ">12</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">1 v 1</div>
									<div className="col-2">:</div>
									<div className="col-6">38</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Victory</div>
									<div className="col-2">:</div>
									<div className="col-6">5</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Left</div>
									<div className="col-2">:</div>
									<div className="col-6">25</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Right</div>
									<div className="col-2">:</div>
									<div className="col-6">17</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="container mt-3 border-top border-bottom">
							<div className="container">
								<div className="row my-3">
									<div className="col-6">
										<div className="container text-center">
											<img className="rounded-circle" width="100" height="100"
												src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
										</div>
									</div>
									<div className="col-6">
										<div className="container text-center">
											<img className="rounded-circle" width="100" height="100"
												src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
										</div>
									</div>
								</div>
								<div className="row my-3">
									<div className="col-6">
										<div className="container text-center">
											<img className="rounded-circle" width="100" height="100"
												src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
										</div>
									</div>
									<div className="col-6">
										<div className="container text-center">
											<img className="rounded-circle" width="100" height="100"
												src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="container mt-3 pt-2 pb-2 border-top border-bottom">
							<div className="my-1 pt-1 pb-1">Match Record</div>
							<div className="my-1 pt-1 pb-1">Match Record</div>
							<div className="my-1 pt-1 pb-1">Match Record</div>
							<div className="my-1 pt-1 pb-1">Match Record</div>
							<div className="my-1 pt-1 pb-1">Match Record</div>
							<div className="my-1 pt-1 pb-1">Match Record</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function createRoomBtn(event) {
	event.preventDefault();
	const roomName = event.target.parentElement.querySelector("input").value;
	console.log(event.target.parentElement.querySelector("input").value);
	const socket = new WebSocket('ws://'
		+ window.location.host
		+ '/api/pong/'
		+ roomName
		+ '/'
	);
}

function test_btn(event) {
	const url = "http://localhost:8000/api/users/";
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MzE1ODY2LCJpYXQiOjE3MTczMTUyNjYsImp0aSI6Ijg0OTlmZDkzZTVjNTQxZGNiNmQ1NTQxNTM2NDA5MjMyIiwidXNlcl9pZCI6MX0.V2XOD7N-U8gs7dAVceU1CSW-pHLCiueTh_scmoHnPPY";
	fetch(url, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	}).then(response => {
		if (response.ok) {
			return (response.json());
		}
	}).then(data => {
		console.log(data);
		console.log(data[0].avatar);
	});
}

function CeateMatch_test() {
	const name = "byejeon";
	return (
		<div>
			<Test.Navbar_test name={name} />
			<Btn size="lg" text="test" onClickFunc={test_btn} />
			{/* <form id="login-form">
				<input
					required
					maxlength="15"
					type="text"
					placeholder="방 이름"
				/>
				<Btn size="" text="Create Room" onClickFunc={createRoomBtn} />
			</form> */}
		</div>
	);
}

const Test = {
	Login_test,
	Navbar_test,
	Home_test,
	UserPage_test,
	CeateMatch_test
};

export default Test;
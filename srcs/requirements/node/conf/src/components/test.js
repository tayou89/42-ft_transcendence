import MyReact from "../MyReact/MyReact.js";

function clickLoginBtn() {
	window.location.href = "http://localhost:8000/api/login/";
}

// size : lg sm ''
function Btn({ size, text, onClickFunc }) {
	function MouseEnter(event) {
		event.target.classList.remove("btn-outline-primary");
		event.target.classList.remove("bg-secondary");
		event.target.classList.add("bg-primary");
	}
	function MouseLeave(event) {
		event.target.classList.add("btn-outline-primary");
		event.target.classList.add("bg-secondary");
		event.target.classList.remove("bg-primary");
	}
	return (
		<button className={`btn btn-${size} bg-secondary btn-outline-primary text-white`} onClick={onClickFunc} onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
			{text}
		</button>
	);
}

function Login_test() {
	return (
		<div className="mt-5">
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

function Navbar_test({ name, phoneNumber }) {
	return (
		<nav className="navbar navbar-expand-sm bg-dark">
			<div className="container col-sm-10 justify-content-center">
				<div className="navbar-nav">
					<a className="nav-link text-white" href="#">42Pong</a>
				</div>
			</div>
			<div className="container col-sm-2">
				<div className="col-sm-3">
					<img className="img-fluid rounded-circle "
					style={{ width: 50, height: 50, borderRadius: '50%' }}
					src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
				</div>
				<div className="col-sm-9">
					<a className="nav-link text-white" href="#">byejeon</a>
				</div>
			</div>
		</nav>
	);
}

const Test = {
	Login_test,
	Navbar_test,
};

export default Test;
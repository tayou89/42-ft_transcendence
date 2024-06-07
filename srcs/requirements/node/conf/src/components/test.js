import MyReact from "../MyReact/MyReact.js";


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

function clickLoginBtn() {
	window.location.href = "http://localhost:8000/api/login/";
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

function Navbar_test({ name }) {
	return (
		<nav className="navbar navbar-expand-sm bg-dark">
			<div className="col-sm-5"></div>
			<div className="container col-sm-2 justify-content-center">
				<div className="navbar-nav">
					<a className="nav-link text-white" href="#">42Pong</a>
				</div>
			</div>
			<div className="col-sm-3"></div>
			<div className="container col-sm-2 justify-content-center">
				<img className="rounded-circle"
					width="30" height="30"
					src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
				<a className="nav-link text-white ps-2" href="#">{name}</a>
			</div>
		</nav>
	);
}

function Home_test({ name }) {
	return (
		<div>
			<Test.Navbar_test name="byejeon" />
			<div className="row p-3 m-3 border">
				<div className="col-md-5">
					<div className="container mt-3 mb-3 pt-2 pb-2 border">
						<div className="container mt-1 text-light border">User</div>
						<div className="container mt-1 text-light border">User</div>
						<div className="container mt-1 text-light border">User</div>
						<div className="container mt-1 text-light border">User</div>
						<div className="container mt-1 text-light border">User</div>
						<div className="container mt-1 text-light border">User</div>
					</div>
					<div className="container mt-3 mb-3 pt-2 pb-2 border">
						<div className="container mt-1 text-light border">Friend</div>
						<div className="container mt-1 text-light border">Friend</div>
						<div className="container mt-1 text-light border">Friend</div>
						<div className="container mt-1 text-light border">Friend</div>
						<div className="container mt-1 text-light border">Friend</div>
						<div className="container mt-1 text-light border">Friend</div>
						<div className="container mt-1 text-light border">Friend</div>
					</div>
				</div>
				<div className="col-md-7">
					<div className="container mt-3 pt-2 pb-2 border">
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
						<div className="container text-light mt-1 pt-1 pb-1 border">Match</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function UserPage_test() {
	return (
		<div>
			<Test.Navbar_test name="byejeon" />
			<div className="row p-3 m-3 border">
				<div className="col-md-12">
					<div className="container mt-3 pt-2 pb-2 ms-0 me-0 text-light border">
						<div>User Info</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="container mt-3 pt-2 pb-2 text-light border">
							<div className="border text-light mt-1 pt-1 pb-1 ">Win</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="container mt-3 pt-2 pb-2 border">
							<div className="border text-light mt-1 pt-1 pb-1 ">Match Record</div>
							<div className="border text-light mt-1 pt-1 pb-1 ">Match Record</div>
							<div className="border text-light mt-1 pt-1 pb-1 ">Match Record</div>
							<div className="border text-light mt-1 pt-1 pb-1 ">Match Record</div>
							<div className="border text-light mt-1 pt-1 pb-1 ">Match Record</div>
							<div className="border text-light mt-1 pt-1 pb-1 ">Match Record</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const Test = {
	Login_test,
	Navbar_test,
	Home_test,
	UserPage_test
};

export default Test;
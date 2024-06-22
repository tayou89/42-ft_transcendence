import MyReact from "../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../MyReact/MyReactRouter.js";
import { navigate } from "../MyReact/MyReactRouter.js";

const defaultMyData = {
	"id": 0,
	"name": "default",
	"email": "default@student.42seoul.kr",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"exp": 0,
	"wins": 0,
	"losses": 0,
	"friends": []
}

function onClickShowMyInfo() {
	navigate("/mypage");
}

function onClickLogout() {
	const logoutApiUrl = "http://localhost:8000/api/logout";
	fetch(logoutApiUrl, {
		method: 'POST',
		credentials: 'include'
	})
		.then(() => {
			navigate("/");
		})
		.catch(console.log);
}

function Navbar({ position }) {
	const [myData, setMyData] = MyReact.useState(defaultMyData);
	const myDataApiUrl = "http://localhost:8000/api/me";

	MyReact.useEffect(() => {
		fetch(myDataApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.detail) {
					tokenRefreshAndGoTo(position);
				} else {
					setMyData(() => data);
				}
			})
			.catch(error => {
				console.log(error);
				navigate("/");
			});
	}, []);

	return (
		<div className="container-fluid bg-dark bg-opacity-75" style="user-select: none;">
			<div className="container">
				<nav className="navbar navbar-expand-sm navbar-dark">
					<div className="container-fluid">
						<Link to="/home" className="navbar-brand fs-4">42 Pong</Link>
						<div className="row">
							<div className="col">
								<img className="rounded-circle"
									width="35" height="35"
									src={myData.avatar} />
							</div>
							<div className="dropdown col">
								<div className=" btn-primary btn-sm text-center text-light fs-4" style="cursor: pointer;" data-bs-toggle="dropdown">
									{myData.name}
								</div>
								<ul className="dropdown-menu" style="cursor: pointer;">
									<li className="dropdown-item" onClick={onClickShowMyInfo}>Show Info</li>
									<li className="dropdown-item text-danger" onClick={onClickLogout}>Logout</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Navbar;
import MyReact from "../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../MyReact/MyReactRouter.js";
import getCookieValue from "./utility/getCookieValue.js";
import { navigate } from "../MyReact/MyReactRouter.js";

function onClickShowMyInfo() {
	navigate("/mypage");
}

function onClickLogout() {
	const logoutApiUrl = "http://localhost:8000/api/logout";
	fetch(logoutApiUrl, {
		method: 'POST',
		credentials: 'include'
	})
		.then(console.log)
		.catch(console.log);
}

function Navbar({ name, profileImg }) {
	return (
		<div className="container-fluide border-bottom" style="user-select: none;">
			<div className="container">
				<nav className="navbar navbar-expand-sm navbar-dark">
					<div className="container-fluid">
						<Link to="/home" className="navbar-brand fs-4">42 Pong</Link>
						<div className="row">
							<div className="col">
								<img className="rounded-circle"
									width="35" height="35"
									src={profileImg} />
							</div>
							<div className="dropdown col">
								<div className=" btn-primary btn-sm text-center text-light fs-4" style="cursor: pointer;" data-bs-toggle="dropdown">
									{name}
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
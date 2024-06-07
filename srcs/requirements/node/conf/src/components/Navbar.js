import MyReact from "../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../MyReact/MyReactRouter.js";
import getCookieValue from "./utility/getCookieValue.js";
import { navigate } from "../MyReact/MyReactRouter.js";

function Navbar({ name }) {
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
					<div className="container col-3 my-2 text-end">
						<img className="rounded-circle"
							width="30" height="30"
							src="https://www.studiopeople.kr/common/img/default_profile.png" />
						<Link to="/profile" className="navbar-brand ps-2 text-light">{name}</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
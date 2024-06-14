import MyReact from "../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../MyReact/MyReactRouter.js";
import getCookieValue from "./utility/getCookieValue.js";

function Navbar({name, profileImg}) {
	return (
		<div className="container-fluide border-bottom">
			<div className="container">
				<nav className="navbar navbar-expand-sm navbar-dark">
					<div className="container-fluid">
						<Link to="/home" className="navbar-brand">42 Pong</Link>
						<div>
							<img className="rounded-circle"
								width="30" height="30"
								src={profileImg} />
							<Link to="/profile" className="navbar-brand ps-2 text-light">{name}</Link>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Navbar;
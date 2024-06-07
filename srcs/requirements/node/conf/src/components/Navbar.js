import MyReact from "../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../MyReact/MyReactRouter.js";

function Navbar({ name }) {
	return (
		<div className="container-fluide border-bottom">
			<div className="container">
				<nav className="navbar navbar-expand-sm navbar-dark">
					<div className="container-fluid">
						<Link to="/" className="navbar-brand">42 Pong</Link>
						<Link to="/login" className="navbar-brand">로그인</Link>
						<div>
							<img className="rounded-circle"
								width="30" height="30"
								src="https://www.studiopeople.kr/common/img/default_profile.png" />
							<Link to="/profile" className="navbar-brand ps-2 text-light">{name}</Link>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Navbar;
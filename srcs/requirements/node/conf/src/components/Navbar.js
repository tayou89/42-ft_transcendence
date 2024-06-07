import MyReact from "../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../MyReact/MyReactRouter.js";
import getCookieValue from "./utility/getCookieValue.js";

function Navbar() {
	const [name, setName] = MyReact.useState("default");
	const [profileImg, setProfileImg] = MyReact.useState("https://www.studiopeople.kr/common/img/default_profile.png");
	const jwt = getCookieValue("jwt");
	const refresh = getCookieValue("refresh");
	const url = "http://localhost:8000/api/users/me/";

	MyReact.useEffect(() => {
		fetch(url, {
			headers: {
				'Authorization': `Bearer ${jwt}`
			}
		})
			.then(response => response.json())
			.then(data => {
				setName(() => data.name);
				setProfileImg(() => data.avatar);
				console.log(profileImg);
			})
			.catch(error => console.log(error));
	}, [jwt]);
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
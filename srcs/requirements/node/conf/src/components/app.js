import MyReact from "../MyReact/MyReact.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Home from "./home/home.js";
import UserPage from "./UserPage.js";
import Login from "./login.js";
import Interchange from "./interchange.js";
import EmailOTP from "./emailOTP.js";
import Game from "./Game/Game.js";
import Room1vs1 from "./Room/1vs1/Room1vs1.js";

function App() {
	return (
		<div>
			<Route path="/" Component={Interchange} />
			<Route path="/emailotp" Component={EmailOTP} />
			{/* <Route path="/home" Component={Home} /> */}
			<Route path="/profile" Component={UserPage} />
			<Route path="/login" Component={Login} />
			{/* <Route path="/" Component={Game} /> */}
			<Route path="/home" Component={Room1vs1} />
		</div>
	);
}

export default App;
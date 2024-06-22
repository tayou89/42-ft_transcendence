import MyReact from "../MyReact/MyReact.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Home from "./home/home.js";
import UserPage from "./UserPage.js";
import Login from "./login.js";
import Interchange from "./interchange.js";
import EmailOTP from "./emailOTP.js";
import Game from "./Game/Game.js";
import Room from "./Room/Room.js";

function App() {
	return (
		<div>
			<Route path="/" component={Interchange} />
			<Route path="/emailotp" component={EmailOTP} />
			<Route path="/main" component={Home} />
			<Route path="/profile" component={UserPage} />
			<Route path="/login" component={Login} />
			<Route path="/game" component={Game} />
			<Route path="/home" component={Room} />
		</div>
	);
}

export default App;
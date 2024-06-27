import MyReact from "../MyReact/MyReact.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Home from "./home/home.js";
import UserPage from "./userPage/UserPage.js";
import Login from "./LoginPage.js";
import Interchange from "./interchange.js";
import EmailOTP from "./emailOTP.js";
import Game from "./Game/Game.js";
import Room from "./Room/Room.js";
import {Home as HomeTest} from './samples/home.js';
import {Login as LoginTest} from './samples/login.js';

function App() {
	return (
		<div>
			<Route path="/" component={Interchange} />
			<Route path="/emailotp" component={EmailOTP} />
			<Route path="/home" component={Home} />
			<Route path="/userpage" component={UserPage} />
			<Route path="/login" component={Login} />
			<Route path="/game" component={Game} />
			<Route path="/room" component={Room} />
		</div>
		// <div>
		// 	<Route path="/" component={HomeTest} />
		// 	<Route path="/login" component={LoginTest} />
		// </div>
	);
}

export default App;
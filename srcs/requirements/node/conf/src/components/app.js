import MyReact from "../MyReact/MyReact.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Home from "./home/home.js";
import UserPage from "./userPage/UserPage.js";
import Login from "./login.js";
import Interchange from "./interchange.js";
import EmailOTP from "./emailOTP.js";

function App() {
	return (
		<div>
			<Route path="/" component={Interchange} />
			<Route path="/emailotp" component={EmailOTP} />
			<Route path="/home" component={Home} />
			<Route path="/userpage" component={UserPage} />
			<Route path="/login" component={Login} />
		</div>
	);
}

export default App;
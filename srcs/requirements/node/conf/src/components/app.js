import MyReact from "../MyReact/MyReact.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Home from "./home/home.js";
import UserPage from "./UserPage.js";
import Login from "./login.js";
import Interchange from "./interchange.js";
import EmailOTP from "./emailOTP.js";
import MyPage from "./userPage/MyPage.js";

function App() {
	return (
		<div>
			<Route path="/" component={Interchange} />
			<Route path="/emailotp" component={EmailOTP} />
			<Route path="/home" component={Home} />
			<Route path="/mypage" component={MyPage} />
			<Route path="/userpage" component={UserPage} />
			<Route path="/login" component={Login} />
		</div>
	);
}

export default App;
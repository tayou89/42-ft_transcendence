import MyReact from "../MyReact/MyReact.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Home from "./home/home.js";
import UserPage from "./UserPage.js";
import Login from "./login.js";
import Interchange from "./interchange.js";
import GamePage from "./GamePage/GamePage.js";

function App() {
	return (
		<div>
			<Route path="/home" component={GamePage} />
			<Route path="/" component={Interchange} />
			{/* <Route path="/home" component={Home} /> */}
			<Route path="/profile" component={UserPage} />
			<Route path="/login" component={Login} />
		</div>
	);
}

export default App;
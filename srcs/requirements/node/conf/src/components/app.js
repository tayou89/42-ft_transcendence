import MyReact from "../MyReact/MyReact.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Home from "./home.js";
import UserPage from "./UserPage.js";
import Login from "./login.js";

function App() {
	return (
		<div>
			<Route path="/" component={Home} />
			<Route path="/profile" component={UserPage} />
			<Route path="/login" component={Login} />
		</div>
	);
}

export default App;
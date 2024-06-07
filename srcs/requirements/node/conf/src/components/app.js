import MyReact from "../MyReact/MyReact.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Test from "./test.js";
import Home from "./Home.js";
import UserPage from "./UserPage.js";
import Login from "./Login.js";

function App() {
	return (
		<div>
			<Route path="/" component={Home} />
			<Route path="/profile" component={UserPage} />
			<Route path="/test" component={Test} />
			<Route path="/login" component={Login} />
		</div>
	);
}

export default App;
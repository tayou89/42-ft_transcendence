import MyReact from "../MyReact/MyReact.js";
import Test from "./test.js";
import Home from "./home.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Home from "./home/home.js";
import UserPage from "./UserPage.js";
import Login from "./login.js";
import Interchange from "./interchange.js";
import GamePage from "./GamePage/GamePage.js";

function App() {
	return (
		<div>
			<Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/room" component={Room} />

			{/* <Test.Home_test name="byejeon"/> */}
			{/* <Test.UserPage_test name="byejeon"/> */}
			{/* <Test.Login_test/> */}
		</div>
	);
}

export default App;
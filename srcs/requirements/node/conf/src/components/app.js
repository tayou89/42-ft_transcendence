import MyReact from "../MyReact/MyReact.js";
import Test from "./test.js";
import Home from "./home.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Login from "./login.js";
import Room from "./room.js";

function App() {
	return (
		<div>
			<Route path="/" component={Test.Home_test} />
			<Route path="/profile" component={Test.UserPage_test} />
			{/* <Route path="/" component={Test.Home_test} /> */}
			{/* <Test.Home_test name="byejeon"/> */}
			{/* <Test.UserPage_test name="byejeon"/> */}
			{/* <Test.Login_test/> */}
			{/* <Test.CeateMatch_test/> */}
			{/* <Route path="/" component={Home} /> */}
      {/* <Route path="/login" component={Login} /> */}
      {/* <Route path="/room" component={Room} /> */}
		</div>
	);
}

export default App;
import MyReact from "../MyReact/MyReact.js";
import Test from "./test.js";
import Home from "./home.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Login from "./login.js";
import Room from "./room.js";

function App() {
	return (
		<div>
			{/* <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/room" component={Room} />
	<div className="container p-5 my-5 border">*/}

			<Test.Home_test name="byejeon"/>
			<Test.UserPage_test name="byejeon"/>
			{/* <Test.Login_test/> */}
		</div>
	);
}

export default App;
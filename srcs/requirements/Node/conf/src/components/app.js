import MyReact from "../MyReact/MyReact.js";
import Home from "./home.js";
import { Route } from "../MyReact/MyReactRouter.js";
import Login from "./login.js";
import Room from "./room.js";

function App() {
  return (
    <div>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/room" component={Room} />
    </div>
  );
}

export default App;
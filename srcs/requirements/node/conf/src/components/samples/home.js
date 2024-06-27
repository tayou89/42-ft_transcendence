import {useEffect, useState, MyReact} from "../../MyReact/MyReact.js";
import Navbar from "./Navbar.js";

function GameBorad() {
  return (
    <div>
        <div>
          <input placeholder="유저검색"/>
        </div>
        <div>
          <div>
            게임시작
          </div>
        </div>
    </div>
  )
}

export function Home() {
  const [state, setState] = useState(0);
  const onClick = () => {
    setState((prev) => prev + 1);
  };
  useEffect(() => {
    console.log("Home Callback state:",state);
    return (() => {console.log("Home CleanUp")});
  }, [state]);
  return (
    // <div>
    //   <Navbar />
    //   <GameBorad />
    // </div>
    <div>
      <Navbar />
      <p1>{state}</p1>
      <button onClick={onClick}>click me!</button>
      <div className="container-fluid p-5 bg-primary text-white text-center">
        <h1>My First Bootstrap Page</h1>
        <p>Resize this responsive page to see the effect!</p>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-4">
            <h3>Column 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
          </div>
          <div className="col-sm-4">
            <h3>Column 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
          </div>
          <div className="col-sm-4">
            <h3>Column 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
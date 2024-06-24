import MyReact from "../../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../../MyReact/MyReactRouter.js";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-black navbar-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">트센</Link>
        <Link to="/login" className="navbar-brand">로그인</Link>
        {/* <a style=" text-decorator: none; text-decoration-line: none; color: white; font-size: 1.2em" href='http://localhost:8000/api/login/'>로그인</a> */}
        <Link to="/room" className="navbar-brand">room</Link>
      </div>	
    </nav>
  )
}

export default Navbar;
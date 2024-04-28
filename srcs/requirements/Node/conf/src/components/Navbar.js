import MyReact from "../MyReact/MyReact.js";
import MyReactRouter, { Link } from "../MyReact/MyReactRouter.js";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-black navbar-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">트센</Link>
        <Link to="/login" className="navbar-brand">로그인</Link>
      </div>
    </nav>
  )
}

export default Navbar;
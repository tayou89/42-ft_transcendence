import { MyReact } from "../../MyReact/MyReact.js";
import "../../css/utility/navigation-bar.css"

function TopLine() {
    return (
        <div className="row" id="navigation-bar">
            <div className="col" id="nothing"></div>
            <div className="col" id="title-box">
                <div id="title">42 Pong</div>
            </div>
            <div className="col" id="user-box"></div>
        </div>
    );
}

export default TopLine;
import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import "../../../css/room/utility/title.css";

function Title({ title } ) {
    return (
        <div className="row" id="room-title-box">
            <div className="row" id="room-title">{ title }</div>
            <div className="row" id="match-type">1 vs 1</div>
        </div>
    );
}

export default Title;
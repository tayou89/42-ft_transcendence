import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import "../../css/game-page/navigation-bar.css"

function User() {
    const userId = "tayou"; //추후 user정보 API 호출

    return (
        <div className="row">
            <div className="col" id="photo"></div>
            <div className="col" id="userId">{userId}</div>
        </div>
    );
}

function NavigationBar() {
    return (
        <div className="row" id="navigation-bar">
            <div className="col" id="nothing"></div>
            <div className="col" id="title">42 Pong</div>
            <div className="col" id="user"><User /></div>
        </div>
    );
}

export default NavigationBar;
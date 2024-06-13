import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Fetch from "../Fetch/Fetch.js";
import "../../css/game-page/navigation-bar.css"

function NavigationBar() {
    return (
        <div className="row" id="navigation-bar">
            <div className="col" id="nothing"></div>
            <div className="col" id="title">42 Pong</div>
            <div className="col" id="user"><User /></div>
        </div>
    );
}

async function User() {
    const myData = await Fetch.myData();
    const userId = myData.name;

    console.log(userId);
    return (
        <div className="row">
            <div className="col" id="photo"></div>
            <div className="col" id="userId">{userId}</div>
        </div>
    );
}

export default NavigationBar;
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Fetch from "../Fetch/Fetch.js";
import "../../css/game-page/navigation-bar.css"

function NavigationBar({myData}) {
    return (
        <div className="row" id="navigation-bar">
            <div className="col" id="nothing"></div>
            <div className="col" id="title">42 Pong</div>
            <div className="col" id="user"><User myData={myData}/></div>
        </div>
    );
}

function User({myData}) {
    try {
        const my = JSON.parse(`${myData}`);
        return (
            <div className="row">
                <div className="col" id="photo"></div>
                <div className="col" id="userId">{my.name}</div>
            </div>
        );
    }
    catch (error) {
        console.log("Error:", error);
    }
}

export default NavigationBar;
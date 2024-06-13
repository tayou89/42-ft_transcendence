import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Fetch from "../Fetch/Fetch.js";
import { DEFAULT_URL } from "../Fetch/constant.js";
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
        const photoURL = DEFAULT_URL + my.avatar;
        return (
            <div className="row">
                <img className="col" id="photo" src={photoURL} />
                <div className="col" id="userId">{my.name}</div>
            </div>
        );
    }
    catch (error) {
    }
}

export default NavigationBar;
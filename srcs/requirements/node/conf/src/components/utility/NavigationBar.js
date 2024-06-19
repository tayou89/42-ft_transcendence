import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Fetch from "../Fetch/Fetch.js";
import "../../css/utility/navigation-bar.css"

function NavigationBar() {
    const [myData, setMyData] = useState(null);
    let   data = "";

    Fetch.setUserData(setMyData, "me");
    data = JSON.stringify(myData);
    return (
        <div className="row" id="navigation-bar">
            <div className="col" id="nothing"></div>
            <div className="col" id="title-box">
                <div id="title">42 Pong</div>
            </div>
            <div className="col" id="user-box">
                <User myData={data}/>
            </div>
        </div>
    );
}

function User({myData}) {
    try {
        const my = JSON.parse(`${myData}`);

        return (
            <div className="row">
                <div className="col" id="photo-box">
                    <img className="col" id="photo" src={my.photoURL} />
                </div>
                <div className="col" id="userId">{my.name}</div>
            </div>
        );
    }
    catch (error) {
    }
}

export default NavigationBar;
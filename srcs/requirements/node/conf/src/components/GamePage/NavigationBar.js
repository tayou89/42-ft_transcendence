import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Fetch from "../Fetch/Fetch.js";
import "../../css/game-page/navigation-bar.css"

function NavigationBar() {
    const [myData, setMyData] = useState("");

    getMyData(myData, setMyData);
    return (
        <div className="row" id="navigation-bar">
            <div className="col" id="nothing"></div>
            <div className="col" id="title">42 Pong</div>
            <div className="col" id="user"><User myData={myData}/></div>
        </div>
    );
}

function getMyData(myData, setMyData) {
    useEffect(() => {
        const callMyData = async() => { 
            const data = await Fetch.myData();

            setMyData(() => JSON.stringify(data));
        };
        callMyData();
    }, []);
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
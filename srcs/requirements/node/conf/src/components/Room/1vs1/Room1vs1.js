import { useEffect, useState, MyReact } from "../../../MyReact/MyReact.js";
import NavigationBar from "../../utility/NavigationBar.js";
import Title from "../utility/Title.js";
import RoomBody from "./RoomBody.js";

function Room1vs1() {
    const title = "1:1 하실 분 들어오세요!";
    return (
        <div className="container-fluid" id="game-page">
            <NavigationBar />
            <Title title={title}/>
            <RoomBody />
        </div>
    );
}

export default Room1vs1;
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import "../../css/room/bottom-line.css";

function BottomLine({ setRoom }) {
    return (
        <div className="row" id="room-bottom">
            <QuitButton setRoom={ setRoom } />
        </div>
    );
}

function QuitButton({ setRoom }) {
    const handleClickEvent = () => { 
        setRoom((prev) => ({...prev, isQuitClicked: !prev.isQuitClicked })); 
    };

    return ( <div id="quit-button" onClick={ handleClickEvent }>Quit</div> );
};

export default BottomLine;
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import "../../css/room/bottom-line.css";

function BottomLine({ setFunction }) {
    return (
        <div className="row" id="room-bottom">
            <QuitButton setFunction={ setFunction } />
        </div>
    );
}

function QuitButton({ setFunction }) {
    const handleClickEvent = () => { 
        setFunction((prev) => ({...prev, isQuitClicked: !prev.isQuitClicked })); 
    };

    return ( <div id="quit-button" onClick={ handleClickEvent }>Quit</div> );
};

export default BottomLine;
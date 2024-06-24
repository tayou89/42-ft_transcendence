import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import "../../css/room/bottom-line.css";

function BottomLine({ setIsQuitClicked }) {
    return (
        <div className="row" id="room-bottom">
            <QuitButton setIsQuitClicked={ setIsQuitClicked } />
        </div>
    );
}

function QuitButton({ setIsQuitClicked }) {
    const handleClickEvent = () => { 
        setIsQuitClicked((prev) => (!prev)); 
    };

    return ( <div id="quit-button" onClick={ handleClickEvent }>Quit</div> );
};

export default BottomLine;
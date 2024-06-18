import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import "../../css/utility/quit-button.css";

function QuitButton({ setIsQuitClicked }) {
    const handleClickEvent = () => { 
        setIsQuitClicked((prev) => (!prev)); 
    };

    return ( <div id="quit-button" onClick={ handleClickEvent }>Quit</div> );
};

export default QuitButton;
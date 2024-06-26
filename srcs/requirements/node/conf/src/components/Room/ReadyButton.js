import { MyReact } from "../../MyReact/MyReact.js";
import "../../css/room/ready-button.css";

function ReadyButton({ status, socket, isMySlot }) {
    console.log("ReadyButton status, socket, isMySlot:", status, socket, isMySlot);
    const id = getElementsId(status);;
    const handleClickEvent = () => { socket.sendReadyStatus(!status); };

    if (isMySlot) 
        return (<div className="ready-button" id={ id } onClick={ handleClickEvent }>Ready</div>);
    else
        return (<div className="ready-button" id={ id }>Ready</div>);
}

function getElementsId(readyStatus) {
    if (readyStatus)
        return ("ready");
    else
        return ("not-ready");
}

export default ReadyButton;
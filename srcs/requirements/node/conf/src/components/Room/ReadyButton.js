import { MyReact } from "../../MyReact/MyReact.js";
import "../../css/room/ready-button.css";

function ReadyButton({ player, socket}) {
    const id = getElementsId(player.ready);;
    const handleClickEvent = () => { socket.sendReadyStatus(!player.ready); };

    if (player.isMyPlayer) 
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
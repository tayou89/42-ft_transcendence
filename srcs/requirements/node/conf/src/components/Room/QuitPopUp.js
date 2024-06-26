import { MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import "../../css/room/quit-popup.css";

function QuitPopUp({ room, setRoom }) {
    const handleClickYes = () => {
        room.socket.sendRoomLeaveMessage();
        navigate("/home");
    }
    const handleClickNo = () => {
        setRoom((prev) => ({ ...prev, isQuitClicked: false }));
    }
    console.log("room:", room);

    if (!room.isQuitClicked)
        return (null);
    return (
        <div className="container-fluid" id="quit-popup">
            <div className="row" id="quit-query">Do you really want to quit?</div>
            <div className="row" id="quit-popup-button-box">
                <div className="col" id="quit-popup-button" onClick={ handleClickYes }>yes</div>
                <div className="col" id="quit-popup-button" onClick={ handleClickNo }>no</div>
            </div>
        </div>
    );
};

export default QuitPopUp;
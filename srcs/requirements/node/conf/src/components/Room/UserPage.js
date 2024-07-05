import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import MatchRecords from "../userPage/MatchRecords.js";
import StatChart from "../userPage/StatChart.js";
import BioMessage from "../userPage/BioMessage.js";

function UserPage({ room, setRoom }) {
    const user = { ...room.clickedPlayer, avatar: room.clickedPlayer.photoURL };
    console.log("This is UserPage!!");
    console.log("user:", user);

	useEffect(() => {
        room.eventHandler.addUserPageClickEvent(setRoom);
        room.eventHandler.addUserPageKeyDownEvent(setRoom);
        return (() => {
            room.eventHandler.removeUserPageClickEvent();
            room.eventHandler.removeUserPageKeyDownEvent();
        });
	}, []);
	return (
		<div className="row text-light">
			<div className="d-flex" style="height: 50px">
				<div className="p-1 fs-2">{user.name} Info</div>
			</div>
			<StatChart userData={ user} myId={ 0 } setRefresh={ null } />
			<div className="mt-3">
				<BioMessage userId={user.id} isMyPage={ false } />
			</div>
			<div className="mt-3">
				<MatchRecords userId={user.id} />
			</div>
		</div>
	);
}

export default UserPage;
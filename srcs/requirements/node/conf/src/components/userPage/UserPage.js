import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Navbar from "../Navbar.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import tokenRefreshAndGoTo from "../utility/tokenRefreshAndGoTo";
import MatchRecords from "./MatchRecords.js";
import StatChart from "./StatChart.js";
import getMyData from "../utility/getMyData.js";
import getUserData from "../utility/getUserData.js";
import logout from "../utility/logout.js";

const defaultData1 = {
	"id": -1234,
	"name": "default",
	"display_name": "display_default",
	"email": "default@student.42seoul.kr",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"exp": 0,
	"wins": 0,
	"losses": 0,
	"friends": [],
	"online": false
}

const defaultData2 = {
	"id": -1235,
	"name": "default",
	"display_name": "display_default",
	"email": "default@student.42seoul.kr",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"exp": 0,
	"wins": 0,
	"losses": 0,
	"friends": [],
	"online": false
}

function UserPage() {
	const queryParams = new URLSearchParams(location.search);
	const userId = queryParams.get('userId');
	const [myData, setMyData] = useState(defaultData1);
	const [userData, setUserData] = useState(defaultData2);

	useEffect(async () => {
		try {
			const _myData = await getMyData();
			setMyData(() => _myData);
		} catch (error) {
			console.log("UserPage Error: ", error);
			logout();
		}
	}, []);

	useEffect(async () => {
		try {
			const _userData = await getUserData(userId);
			setUserData(() => _userData);
		} catch (error) {
			console.log("UserPage Error: ", error);
			logout();
		}
	}, [userId]);

	return (
		<div>
			<Navbar position="/userpage" />
			<div className="container text-light">
				<StatChart isMyInfo={myData.id === userData.id} myId={myData.id} userData={userData} />
				<div className="mt-3">
					<MatchRecords userId={userId} />
				</div>
			</div>
		</div>
	);
}

export default UserPage;
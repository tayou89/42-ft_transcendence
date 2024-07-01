import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Navbar from "../Navbar.js";
import { Link, navigate } from "../../MyReact/MyReactRouter.js";
import MatchRecords from "./MatchRecords.js";
import StatChart from "./StatChart.js";
import getMyData from "../utility/getMyData.js";
import getUserData from "../utility/getUserData.js";
import logout from "../utility/logout.js";
import ChangeMyNicknameModal from "./ChangeMyNicknameModal.js";
import DeleteMyAccountModal from "./DeleteMyAccountModal.js";

const defaultData1 = {
	"id": -1234,
	"name": "",
	"display_name": "",
	"email": "",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"exp": 0,
	"wins": 0,
	"losses": 0,
	"friends": [],
	"online": false
}

const defaultData2 = {
	"id": -1235,
	"name": "",
	"display_name": "",
	"email": "",
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
	useEffect(() => {
		const a = async () => {
			try {
				const _myData = await getMyData();
				const _userData = await getUserData(userId);
				console.log(_myData);
				setMyData(() => _myData);
				setUserData(() => _userData);
			} catch (error) {
				console.log("UserPage Error: ", error);
				logout();
			}
		};
		a();
	}, [userId]);
	return (
		<div style="user-select: none;">
			<Navbar position="/userpage" />
			<div className="container text-light">
				<div className="d-flex">
					<div className="p-1 fs-3">{userData.name} Info</div>
					<div className="p-1 my-1">
						{myData.id === userData.id ? <ChangeMyNicknameModal myId={myData.id} setMyData={setMyData} /> : null}
					</div>
					<div className="p-1 mt-1">
						{myData.id === userData.id ? <DeleteMyAccountModal myId={myData.id} /> : null}
					</div>
				</div>
				<StatChart userData={userData} myId={myData.id} />
				<div className="mt-3">
					<MatchRecords userId={userId} />
				</div>
			</div>
		</div>
	);
}

export default UserPage;
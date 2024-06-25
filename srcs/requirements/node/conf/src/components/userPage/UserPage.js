import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Navbar from "../Navbar.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import tokenRefreshAndGoTo from "../utility/tokenRefreshAndGoTo";
import MatchRecords from "./MatchRecords.js";
import StatChart from "./StatChart.js";

const defaultData1 = {
	"id": 0,
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
	"id": -1,
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
	const [myData, setMyData] = MyReact.useState(defaultData1);
	const myDataApiUrl = "http://localhost:8000/api/me";

	const [userData, setUserData] = MyReact.useState(defaultData2);
	const userDataApiUrl = `http://localhost:8000/api/users/${userId}`;

	MyReact.useEffect(() => {
		fetch(myDataApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.detail) {
					tokenRefreshAndGoTo(`/userpage?userId=${userId}`);
				} else {
					setMyData(() => data);
				}
			})
			.catch(error => {
				console.log("in UserPage function", error);
				navigate("/");
			});

		fetch(userDataApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(userDataApiUrl);
				console.log("GET userData", data);
				if (data.detail) {
					tokenRefreshAndGoTo(`/userpage?userId=${userId}`);
				} else {
					setUserData(() => data);
				}
			})
			.catch(error => {
				console.log("in UserPage function", error);
				navigate("/");
			});
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
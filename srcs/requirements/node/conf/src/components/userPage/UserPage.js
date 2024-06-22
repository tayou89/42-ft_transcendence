import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Navbar from "../Navbar.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import tokenRefreshAndGoTo from "../utility/tokenRefreshAndGoTo";
import ChangeMyNicknameModal from "./ChangeMyNicknameModal.js";
import DeleteMyAccountModal from "./DeleteMyAccountModal.js";
import MatchRecords from "./MatchRecords.js";
import WinRateDonut from "./WinRateDonut.js";

const defaultData = {
	"id": 0,
	"name": "default",
	"display_name": "display_default",
	"email": "default@student.42seoul.kr",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"exp": 1234,
	"wins": 12,
	"losses": 8,
	"friends": []
}

function UserPage({ id }) {
	const [myData, setMyData] = MyReact.useState(defaultData);
	const myDataApiUrl = "http://localhost:8000/api/users/me";

	const [userData, setUserData] = MyReact.useState(defaultData);
	const userDataApiUrl = `http://localhost:8000/api/users/${id}`;

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
					tokenRefreshAndGoTo("/userpage");
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
				if (data.detail) {
					tokenRefreshAndGoTo("/userpage");
				} else {
					console.log(data);
					setUserData(() => data);
				}
			})
			.catch(error => {
				console.log("in UserPage function", error);
				navigate("/");
			});
	}, []);

	return (
		<div>
			<Navbar position="/userpage" />
			<div className="container text-light">
				<StatChart myId={myData.id} userData={userData} />
				<div className="row">
					<div className="col-md-5 mt-3">
						<WinRateDonut userData={userData} />
					</div>
					<div className="col-md-7 mt-3">
						<MatchRecords userData={userData} />
					</div>
				</div>
			</div>
		</div>
	);
}

function StatChart({ myId, userData }) {
	const level = Math.floor(userData.exp / 1000);
	const nextexp = Math.floor((userData.exp + 1000) / 1000) * 1000;
	const win = userData.wins;
	const loss = userData.losses;
	return (
		<div>
			<div className="container">
				<div className="d-inline-flex">
					<div className="p-1 fs-3">{userData.name} Info</div>
					<div className="p-1 mt-1">
						{myId === userData.id ? <ChangeMyNicknameModal title="Change nickname" myId={myId} /> : null}
					</div>
					<div className="p-1 mt-1">
						{myId === userData.id ? <DeleteMyAccountModal title="delete Account" myId={myId} /> : null}
					</div>
					<div className="p-1 mt-3">
						nickname: {userData.display_name}
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row border-top border-bottom rounded bg-secondary bg-opacity-25">
					<div className="col-md-5">
						<div className="container m-1 text-center">
							<img className="rounded-circle"
								width="120" height="120"
								src={userData.avatar}></img>
							<div className="container mt-1 text-center">{userData.name}</div>
						</div>
					</div>
					<div className="col-md-7">
						<div className="container m-1 text-center">
							<div className="row mt-1 mb-1">
								<div className="col-4">Level</div>
								<div className="col-2">:</div>
								<div className="col-6">{level}</div>
							</div>
							<div className="row mt-1 mb-1">
								<div className="col-4">Exp</div>
								<div className="col-2">:</div>
								<div className="col-6">{userData.exp}/{nextexp}</div>
							</div>
							<div className="row mt-1 mb-1">
								<div className="col-4">Total</div>
								<div className="col-2">:</div>
								<div className="col-6">{win + loss}</div>
							</div>
							<div className="row mt-1 mb-1">
								<div className="col-4">Win</div>
								<div className="col-2">:</div>
								<div className="col-6">{win}</div>
							</div>
							<div className="row mt-1 mb-1">
								<div className="col-4">Lose</div>
								<div className="col-2">:</div>
								<div className="col-6">{loss}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserPage;
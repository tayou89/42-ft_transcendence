import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Navbar from "../Navbar.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import tokenRefreshAndGoTo from "../utility/tokenRefreshAndGoTo";
import ChangeMyNicknameModal from "./ChangeMyNicknameModal.js";
import DeleteMyAccountModal from "./DeleteMyAccountModal.js";
import MatchRecords from "./MatchRecords.js";
import WinRateDonut from "./WinRateDonut.js";

const defaultMyData = {
	"id": 0,
	"name": "default",
	"email": "default@student.42seoul.kr",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"exp": 1234,
	"wins": 12,
	"losses": 8,
	"friends": []
}

function UserPage() {
	const [myData, setMyData] = MyReact.useState(defaultMyData);
	const myDataApiUrl = "http://localhost:8000/api/me";

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
					tokenRefreshAndGoTo("/mypage");
				} else {
					setMyData(() => data);
				}
			})
			.catch(error => {
				console.log(error);
				navigate("/");
			});
	}, []);

	return (
		<div>
			<Navbar name={myData.name} profileImg={myData.avatar} />
			<div className="container text-light">
				<StatChart myData={myData} />
				<div className="row">
					<div className="col-md-5 mt-3">
						<WinRateDonut myData={myData} />
					</div>
					<div className="col-md-7 mt-3">
						<MatchRecords myId={myData.id} />
					</div>
				</div>
			</div>
		</div>
	);
}

function StatChart({ myData }) {
	const level = Math.floor(myData.exp / 1000);
	const nextexp = Math.floor((myData.exp + 1000) / 1000) * 1000;
	const win = myData.wins;
	const loss = myData.losses;
	return (
		<div>
			<div className="container">
				<div className="d-inline-flex">
					<div className="p-1 fs-3">{myData.name} Info</div>
					<div className="p-1 mt-1">
						<ChangeMyNicknameModal title="Change nickname" myId={myData.id} />
					</div>
					<div className="p-1 mt-1">
						<DeleteMyAccountModal title="delete Account" myId={myData.id} />
					</div>
					<div className="p-1 mt-1">

					</div>
				</div>
			</div>
			<div className="container">
				<div className="row border-top border-bottom rounded bg-secondary bg-opacity-25">
					<div className="col-md-5">
						<div className="container m-1 text-center">
							<img className="rounded-circle"
								width="120" height="120"
								src={myData.avatar}></img>
							<div className="container mt-1 text-center">{myData.name}</div>
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
								<div className="col-6">{myData.exp}/{nextexp}</div>
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
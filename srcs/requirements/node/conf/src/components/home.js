import { useEffect, useState, MyReact } from "../MyReact/MyReact.js";
import Navbar from "./Navbar.js";
import isLogin from "./utility/isLogin.js";
import Btn from "./utility/Btn.js";


function HomeMyInfo({ myData }) {
	{
		myData.wins = 10;
		myData.losses = 20;
		const expWidth = `width:${(myData.nowexp / myData.needexp) * 100}%`;
		const winRateWidth = myData.wins + myData.losses === 0 ?
			"width:0%" : `width:${(myData.wins / (myData.wins + myData.losses)) * 100}%`;
		return (
			<div className="container mb-3 pt-2 pb-2 border-top border-bottom text-center">
				<div className="row mt-1 mb-1">
					<div className="col-2">Level</div>
					<div className="col-1">:</div>
					<div className="col-8">{myData.level}</div>
				</div>
				<div className="row mt-1 mb-1">
					<div className="col-2">Exp</div>
					<div className="col-1">:</div>
					<div className="col-8 pt-1">
						<div className="progress" style="height:20px">
							<div className="progress-bar" style={expWidth}>{myData.nowexp / myData.needexp}</div>
						</div>
					</div>
				</div>
				<div className="row mt-1 mb-1">
					<div className="col-2">Total</div>
					<div className="col-1">:</div>
					<div className="col-8">{myData.wins + myData.losses}</div>
				</div>
				<div className="row mt-1 mb-1">
					<div className="col-2">Win</div>
					<div className="col-1">:</div>
					<div className="col-8">{myData.wins}</div>
				</div>
				<div className="row mt-1 mb-1">
					<div className="col-2">Lose</div>
					<div className="col-1">:</div>
					<div className="col-8">{myData.losses}</div>
				</div>
				<div className="row mt-1 mb-1">
					<div className="col-2">WR</div>
					<div className="col-1">:</div>
					<div className="col-8 pt-1">
						<div className="progress" style="height:20px">
							<div className="progress-bar" style={winRateWidth}>
								{myData.wins + myData.losses === 0 ? "0%" : `${Math.round((myData.wins / (myData.wins + myData.losses)) * 100)}%`}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function HomeFriendsFriendInfo() {
	{
		return (
			<div className="container mt-1 ">Friend</div>
		);
	}
}

function HomeFriends({ myFriends }) {
	{

		return (
			<div className="container mt-1 mb-3 pt-2 pb-2 border-top border-bottom">
				<div className="container mt-1 ">Friend</div>
				<div className="container mt-1 ">Friend</div>
				<div className="container mt-1 ">Friend</div>
				<div className="container mt-1 ">Friend</div>
				<div className="container mt-1 ">Friend</div>
				<div className="container mt-1 ">Friend</div>
				<div className="container mt-1 ">Friend</div>
			</div>
		);
	}
}

function HomeMatches({ matchData }) {
	{
		return (
			<div className="container pt-2 pb-2 border-top border-bottom">
				<div className="container my-3">Match</div>
				<div className="container my-3">Match</div>
				<div className="container my-3">Match</div>
				<div className="container my-3">Match</div>
				<div className="container my-3">Match</div>
				<div className="container my-3">Match</div>
				<div className="container my-3">Match</div>
				<div className="container my-3">Match</div>
				<div className="container my-3">Match</div>
			</div>
		);
	}
}

const defaultMyData = {
	"id": 0,
	"name": "default",
	"email": "default@student.42seoul.kr",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"wins": 0,
	"losses": 0,
	"friends": []
}

function Home() {
	const [myData, setMyData] = MyReact.useState(defaultMyData);
	const [matchData, setMatchData] = MyReact.useState(defaultMyData);
	const myDataApiUrl = "http://localhost:8000/api/users/me";
	MyReact.useEffect(() => {
		fetch(myDataApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.detail === "Given token not valid for any token type") {
					navigate("/login");
				} else if (data.detail === "Authentication credentials were not provided.") {
					navigate("/login");
				} else {
					setMyData(() => data);
				}
			})
			.catch(error => {
				console.log(error);
				navigate("/login");
			});
	}, []);
	return (
		<div>
			<Navbar name={myData.name} profileImg={myData.avatar} />
			<div className="container text-light">
				<div className="row mt-3">
					<div className="col-md-5">
						<div className="fs-4">
							My Info
						</div>
						<HomeMyInfo myData={myData} />
						<div className="fs-4">
							Friends
						</div>
						<HomeFriends myFriends={myData.friends} />
					</div>
					<div className="col-md-7">
						<div className="fs-4">
							Matchs
						</div>
						<HomeMatches />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;

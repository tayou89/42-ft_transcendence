import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";

const defaultUserData = {
	"id": 0,
	"name": "default",
	"email": "default@student.42seoul.kr",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"exp": 1234,
	"wins": 0,
	"losses": 0,
	"friends": []
}

function HomeFriendsFriendInfo({ id }) {
	const [userInfo, setUserInfo] = useState(defaultUserData);
	const userInfoApiUrl = `http://localhost:8000/api/users/${id}`;
	useEffect(() => {
		fetch(userInfoApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => response.json())
			.then(data => {
				setUserInfo(() => data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [])
	return (
		<div className="container mt-1">
			<div className="row border text-light">
				<div className="col-2 border text-center">
					<img className="rounded-circle"
						width="24" height="24"
						src={userInfo.avatar} />
				</div>
				<div className="col-8 border">{userInfo.name}</div>
				<div className="col-2 border">{userInfo.status === "login" ? "login" : "logout"}</div>
			</div>
		</div>
	);
}

function HomeFriends({ myFriends }) {
	return (
		<div>
			<div className="fs-4">
				Friends
			</div>
			<div className="container mt-1 mb-3 pt-2 pb-2 border-top border-bottom">
				{myFriends.map(id => (
					<HomeFriendsFriendInfo key={id} id={id} />
				))}
			</div>
		</div>
	);
}

export default HomeFriends;

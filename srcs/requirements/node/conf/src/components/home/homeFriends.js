import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Btn from "../utility/Btn.js";

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

function AddNewFriend() {
	const [addFriendMsg, setAddFriendMsg] = useState("");
	function onClickSubmit(event) {
		event.preventDefault();
		const input = event.target.parentNode.querySelector("input");
		console.log(input.value);
		setAddFriendMsg(() => "Successfully Added!");
	}
	return (
		<div>
			<button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
				add Friend
			</button>
			<div className="modal text-center" id="myModal">
				<div className="modal-dialog">
					<div className="modal-content">

						<div className="modal-header text-dark">
							<h4 className="modal-title">Add Your New Friend!</h4>
							<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
						</div>

						<div className="modal-body">
							<form className="container my-1 py-1">
								<input className="me-1" type="text" placeholder="Friend name" />
								<Btn size="md" text="Submit" onClickFunc={onClickSubmit} />
							</form>
							<div className="container mt-2 text-success">
								{addFriendMsg}
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

function HomeFriends({ myFriends }) {
	return (
		<div>
			<div className="fs-4 row">
				<div className="container col-6">
					Friends
				</div>
				<div className="container col-6 text-end pe-4">
					<AddNewFriend />
				</div>
			</div>
			<div className="container mt-1 mb-3 pt-2 pb-2 border-top border-bottom">
				{myFriends.map(id => (
					<HomeFriendsFriendInfo key={id} id={id} />
				))}
			</div>
		</div>
	);
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

export default HomeFriends;

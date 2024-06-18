import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Btn from "../utility/Btn.js";

const defaultUserData = {
	"id": 1,
	"name": "default",
	"email": "default@student.42seoul.kr",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"exp": 1234,
	"wins": 0,
	"losses": 0,
	"friends": [1]
}

function HomeFriends({ myData }) {
	myData = defaultUserData;
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
				{myData.friends.map(id => (
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
				console.log(data);
				setUserInfo(() => data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [])

	function unFriend(event) {
		// console.log(event);
		console.log(`u clicked unfriend`);
		const unFriendApiUrl = "http://localhost:8000/";
	}
	return (
		<div className="container mt-1">
			<div className="row border text-light">
				<div className="col-2 border text-center">
					<img className="rounded-circle"
						width="24" height="24"
						src={userInfo.avatar} />
				</div>
				<div className="col-8 border">
					<div className="dropdown dropend" style="user-select: none; cursor: pointer;">
						<div className=" btn-primary btn-sm text-center" data-bs-toggle="dropdown">
							{userInfo.name}
						</div>
						<ul className="dropdown-menu" >
							<li className="dropdown-item">Show Info</li>
							<li className="dropdown-item text-danger" onClick={unFriend}>Unfriended</li>
						</ul>
					</div>
				</div>
				<div className="col-2 border">{userInfo.status === "login" ? "login" : "logout"}</div>
			</div>
		</div>
	);
}

function modifyCommentMsg(msg, isSuccess) {
	const comment = document.querySelector("#add-friend-status");
	if (comment) {
		comment.classList.remove("text-success");
		comment.classList.remove("text-danger");
		comment.innerText = msg;
		if (isSuccess === true) {
			comment.classList.add("text-success");
		} else {
			comment.classList.add("text-danger");
		}
	}
}

function AddNewFriend() {
	function onClickSubmit(event) {
		event.preventDefault();
		const input = event.target.parentNode.querySelector("input");
		fetch(`http://localhost:8000/api/users?name=${input.value}`, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => response.json())
			.then(data => {
				if (data.status === "success") {
					modifyCommentMsg("Successfully Added!", true);
				} else {
					modifyCommentMsg(data.result, false);
				}
				setTimeout(() => {
					modifyCommentMsg("", true);
				}, 3000);
			})
			.catch(console.log);
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
							<div id="add-friend-status" className="container mt-2 text-success">
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeFriends;

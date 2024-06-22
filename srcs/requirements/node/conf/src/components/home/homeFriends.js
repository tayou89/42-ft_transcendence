import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";

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
	return (
		<div>
			<div className="fs-4 row">
				<div className="container col-6">
					Friends
				</div>
				<div className="container col-6 text-end pe-4">
					<AddNewFriendModal title="add Friend" />
				</div>
			</div>
			<div className="container mt-1 mb-3 pt-2 pb-2 border-top border-bottom rounded bg-secondary bg-opacity-25">
				{myData.friends.map(id => (
					<HomeFriendsFriendInfo id={id} />
				))}
			</div>
		</div>
	);
}

function unFriend(id) {
	const unFriendApiUrl = `http://localhost:8000/api/me/friend/${id}`;
	fetch(unFriendApiUrl, {
		method: 'DELETE',
		credentials: 'include'
	})
}

//!!!??? 로그아웃/로그인 이쁘게 바꿔야함.
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
							<li className="dropdown-item text-danger" onClick={() => unFriend(id)}>Unfriended</li>
						</ul>
					</div>
				</div>
				<div className="col-2 border">{userInfo.online === true ? "login" : "logout"}</div>
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

//!!!??? 성공했을 때 친구 목록이 바로 업데이트되게끔 바꿔야함.
//!!!??? 성공/실패 메세지 뜨고 잠시뒤에 or 창 닫으면 사라지게 하고싶음. settimeout 쓰면 1초에 한번씩 눌렀을 때 처음 누른 settimeout 때문에 3번째에 나온 메세지가 1초만에 사라짐.
function onClickSubmit(event) {
	event.preventDefault();
	const input = event.target.parentNode.querySelector("#add-friend-input");
	fetch("http://localhost:8000/api/me/friend", {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json' // 보낼 데이터의 형식 지정
		},
		body: JSON.stringify({
			name: input.value
		})
	})
		.then(response => {
			console.log(response);
			return response.json();
		})
		.then(data => {
			if (data.result === "Successfully Added!") {
				modifyCommentMsg("Successfully Added!", true);
			} else {
				modifyCommentMsg(data.result, false);
			}
		})
		.catch(error => {
			modifyCommentMsg("Network Error!", false);
			console.log(error);
		});
}

function AddNewFriendModal({ title }) {
	return (
		<div>
			<button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#add-friend-modal">
				{title}
			</button>
			<div className="modal text-center" id="add-friend-modal">
				<div className="modal-dialog">
					<div className="modal-content">

						<div className="modal-header text-dark">
							<h4 className="modal-title">Add Your New Friend!</h4>
							<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
						</div>

						<div className="modal-body">
							<form className="container my-1 py-1">
								<input id="add-friend-input" className="me-1" type="text" placeholder="Friend name" />
								<button className="btn btn-primary btn-md" onClick={onClickSubmit}>Submit</button>
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

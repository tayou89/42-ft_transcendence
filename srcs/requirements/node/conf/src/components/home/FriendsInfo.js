import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import getMyData from "../utility/getMyData.js";
import logout from "../utility/logout.js";
import tokenRefresh from "../utility/tokenRefresh.js";
import closeModalById from "../utility/closeModalById.js"
import getUserData from "../utility/getUserData.js";
import notifyStatusById from "../utility/notifyStatusById.js"
import getUserProfileImage from "../utility/getUserProfileImage.js";
import RoadingSpinning from "../utility/LoadingSpinning.js";
import "../../css/home/RotatingImage.css"

const defaultFriendData = {
	"id": 0,
	"name": "",
	"email": "",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"exp": 0,
	"wins": 0,
	"losses": 0,
	"friends": [],
	"online": true
}

function FriendsInfo() {
	const [friends, setFriends] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const a = async () => {
			try {
				const _myData = await getMyData();
				setFriends(() => _myData.friends);
				setLoading(() => false);
			} catch (error) {
				console.log("HomeFriends Error: ", error);
				logout();
			}
		};
		a();
	}, [loading])
	return (
		<div className="my-2">
			<div className="fs-4 row">
				<div className="container col-4">
					Friends
				</div>
				<div className="container col-8 text-end pe-4 d-flex flex-row-reverse align-items-center">
					<AddNewFriendModal title="add Friend" setLoading={setLoading} />
					<RefreshFriendsButton setLoading={setLoading} />
				</div>
			</div>
			<div
				className="container mt-1 py-2 px-3 border-top border-bottom rounded bg-secondary bg-opacity-25"
				style="height: 400px; overflow-y: auto;">
				{loading ?
					<RoadingSpinning />
					: friends.map(id => (
						<FriendInfo friendId={id} setLoading={setLoading} />
					))}
			</div>
		</div>
	);
}

function RefreshFriendsButton({ setLoading }) {
	const [isRotated, setIsRotated] = useState(false);

	function onClickrefreshFriends(event) {
		event.preventDefault();
		setLoading(() => true);
	}
	function handleMouseEnter() {
		setIsRotated(() => true);
	};
	function handleMouseLeave() {
		setIsRotated(() => false);
	};
	return (
		<div className="d-flex justify-content-center bg-primary rounded me-1"
			onClick={onClickrefreshFriends} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
			style="height:30px; width:30px; cursor: pointer;">
			<div className="d-flex align-items-center">
				<img src="/images/refresh.png"
					className={`image ${isRotated ? 'rotate' : ''}`}
					style="height:25px; width:25px;" />
			</div>
		</div>
	);
}

async function unFriend(friendId, retryCount = 0) {
	try {
		const response = await fetch(`/user/api/me/friend/${friendId}`, {
			method: 'DELETE',
			credentials: 'include'
		});
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 401 && retryCount < 2) {
			return await tokenRefresh(async () => await unFriend(friendId, retryCount + 1));
		} else {
			return Promise.reject("unknown");
		}
	} catch (error) {
		console.log("unFriend Error: ", error);
		return Promise.reject(error);
	}
}

async function onClickUnFriend(event, friendId, setLoading) {
	event.preventDefault();
	try {
		await unFriend(friendId);
		setLoading(() => true);
	} catch (error) {
		console.log("onClickUnFriend Error: ", error);
		logout();
	}
}

function onClickShowFriendsInfo(friendId) {
	navigate(`/userpage?userId=${friendId}`);
}

function FriendInfo({ friendId, setLoading }) {
	const [userData, setUserData] = useState(defaultFriendData);
	const [userImage, setUserImage] = useState("https://www.studiopeople.kr/common/img/default_profile.png");
	useEffect(() => {
		const a = async () => {
			try {
				const _userData = await getUserData(friendId);
				const _userImage = await getUserProfileImage(_userData.id);
				setUserData(() => _userData);
				setUserImage(() => _userImage);
			} catch (error) {
				console.log("FriendInfo Error: ", error);
				logout();
			}
		};
		a();
	}, [])

	return (
		<div className={"container border-start border-end rounded bg-opacity-10 text-light d-flex align-items-center mb-1"
			+ (userData.online === true ? " border-success bg-success" : " border-danger bg-danger")} style="height:42px; width:100%">
			<div className="d-flex justify-content-between align-items-center" style="width:100%">
				<img className="rounded-circle"
					style="object-fit: cover;"
					width="32" height="32"
					src={userImage} />
				<div className="dropdown fs-4" style="user-select: none; cursor: pointer;">
					<div className=" btn-primary btn-sm text-center" data-bs-toggle="dropdown">
						{userData.name}
					</div>
					<ul className="dropdown-menu" >
						<li className="dropdown-item" onClick={() => onClickShowFriendsInfo(friendId)}>Show Info</li>
						<li className="dropdown-item text-danger" onClick={event => onClickUnFriend(event, friendId, setLoading)}>Unfriended</li>
					</ul>
				</div>
				<div>
					<div style={"width: 20px; height: 20px; border-radius: 50%; background-color: " + (userData.online === true ? "green;" : "red;")}></div>
				</div>
			</div>
		</div>
	);
}

async function addNewFriend(newFriendName, retryCount = 0) {
	try {
		const response = await fetch("/user/api/me/friend", {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: newFriendName
			})
		});
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 401 && retryCount < 2) {
			return await tokenRefresh(async () => await addNewFriend(newFriendName, retryCount + 1));
		} else {
			return Promise.reject("unknown");
		}
	} catch (error) {
		console.log("addNewFriend Error: ", error);
		return Promise.reject(error);
	}
}

async function onClickAddNewFriendSubmit(event, setLoading) {
	event.preventDefault();
	const newFriendName = document.querySelector("#add-friend-input").value;
	try {
		const data = await addNewFriend(newFriendName);
		if (data.result === "Successfully Added!") {
			notifyStatusById("Successfully Added!", true, "add-friend-status")
			setLoading(() => true);
		} else {
			notifyStatusById(data.result, false, "add-friend-status")
		}
	} catch (error) {
		console.log("onClickAddNewFriendSubmit Error: ", error);
		closeModalById("add-friend-modal");
		logout();
	}
}

function AddNewFriendModal({ title, setLoading }) {
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
								<input id="add-friend-input" className="me-1" type="text" placeholder="Friend name" autocomplete="off" />
								<button className="btn btn-primary btn-md" onClick={event => { onClickAddNewFriendSubmit(event, setLoading) }}>Submit</button>
							</form>
							<div id="add-friend-status" className="container mt-2 text-success"></div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

export default FriendsInfo;

import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import Btn from "../utility/Btn.js";

const sampleRooms = [
	{
		"id": 1,
		"name": "room1",
		"p1": 1,
		"p2": 1,
		"p3": null,
		"p4": null,
		"in_game": false,
		"mtt": false,
		"max_users": 2,
		"cur_users": 1
	},
	{
		"id": 2,
		"name": "room2",
		"p1": 1,
		"p2": 1,
		"p3": null,
		"p4": null,
		"in_game": false,
		"mtt": false,
		"max_users": 2,
		"cur_users": 1
	},
	{
		"id": 3,
		"name": "room3",
		"p1": 1,
		"p2": 1,
		"p3": null,
		"p4": null,
		"in_game": true,
		"mtt": true,
		"max_users": 4,
		"cur_users": 4
	}
]

function HomeMatches() {
	const [rooms, setRooms] = useState([]);
	const roomsInfoApiUrl = "http://localhost:8000/api/rooms";
	useEffect(() => {
		fetch(roomsInfoApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => {
				setRooms(() => sampleRooms);
			})
		// .then(data => {
		// 	setRooms(() => data);
		// })
		// .catch(console.log());
	}, []);
	return (
		<div>
			<div className="fs-4 row">
				<div className="container col-6">
					Matches
				</div>
				<div className="container col-6 text-end pe-4">
					<Btn size="sm" text="Create Room" onClickFunc={onClickCreateRoom} />
				</div>
			</div>
			<div className="container pt-2 pb-2 border-top border-bottom">
				<div>
					{rooms.map((room) => {
						if (room.cur_users !== room.max_users && room.in_game === false) {
							return (<HomeMatchInfo room={room} active={true} />)
						} else {
							return (<HomeMatchInfo room={room} active={false} />)
						}
					})}
				</div>
			</div>
		</div>
	);
}

function onClickCreateRoom(event) {
	event.preventDefault();
}

function enterCreatedRoom() {
	console.log("enter CreateRoom");
}

function HomeMatchInfo({ room, active }) {
	const opt1 = "container rounded text-center my-2 py-3 text-light border bg-primary";
	const opt2 = "container rounded text-center my-2 py-3 text-light border bg-secondary";
	const [mouseEntered, setMouseEntered] = useState(false);
	function MouseEnter() {
		setMouseEntered(() => true);
	}
	function MouseLeave(event) {
		setMouseEntered(() => false);
	}
	if (!mouseEntered || active === false) {
		return (
			<div className={active === true ? opt1 : opt2} style="height: 82px; user-select: none;" onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
				<div className="container-fluid">{room.name}</div>
				<div className="row">
					<div className="col-6">
						{room.mtt === true ? "Tournerment" : "1 vs 1"}
					</div>
					<div className="col-6">
						{room.cur_users} / {room.max_users}
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="my-2 py-4 fs-4 text-center bg-primary rounded border"
				style="height: 82px; user-select: none; cursor: pointer;"
				onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}
				onClick={enterCreatedRoom}
			>
				<div>
					Enter Room
				</div>
			</div>
		);
	}
}

export default HomeMatches;
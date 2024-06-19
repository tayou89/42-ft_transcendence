import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";

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

//???!!! room 보여주는 로직 만들어야함.
function HomeMatches({ myId }) {
	const [rooms, setRooms] = useState([]);
	const roomsInfoApiUrl = "http://localhost:8000/api/rooms";
	useEffect(() => {
		fetch(roomsInfoApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => {
				console.log(response);
				setRooms(() => sampleRooms);
			})
			.catch(console.log);
	}, []);
	return (
		<div>
			<div className="fs-4 row mb-1">
				<div className="container col-6">
					Matches
				</div>
				<div className="container col-6 text-end pe-4">
					<CreateRoomModal myId={myId} />
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

function onClickSubmit(event, myId) {
	event.preventDefault();
	let title = event.target.parentNode.querySelector("#create-room-input").value;
	const selectedRadio = event.target.parentNode.querySelector("input[name='optradio']:checked").value;
	if (title === "") {
		if (selectedRadio === "1vs1") {
			title = "Let's play 1:1 with me";
		} else {
			title = "Let's play a tournament";
		}
	}
	if (selectedRadio === "1vs1") {
		navigate("/room/1vs1", { title, myId });
	} else {
		navigate("/room/tournament", { title, myId });
	}
}

function CreateRoomModal({ myId }) {
	return (
		<div>
			<button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#create-room-modal">
				Create Room
			</button>
			<div className="modal" id="create-room-modal">
				<div className="modal-dialog">
					<div className="modal-content">

						<div className="modal-header text-dark">
							<h4 className="modal-title">Create New Room</h4>
							<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
						</div>

						<div className="modal-body">
							<div className="row">
								<div className="col-2"></div>
								<div className="col-10">
									<form className="text-start">
										<div className="form-check">
											<input type="radio" className="form-check-input" id="radio1" name="optradio" value="1vs1" checked />
											<label className="form-check-label text-dark" for="radio1">1 vs 1</label>
										</div>
										<div className="form-check">
											<input type="radio" className="form-check-input" id="radio2" name="optradio" value="tournament" />
											<label className="form-check-label text-dark" for="radio2">Tournerment(4P)</label>
										</div>
										<input id="create-room-input" className="me-1" type="text" placeholder="Room name" />
									</form>
									<button className="btn btn-primary btn-md" onClick={(event) => onClickSubmit(event, myId)}>Submit</button>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
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
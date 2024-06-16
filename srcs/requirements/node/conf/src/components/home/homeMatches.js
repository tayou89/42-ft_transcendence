import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";

function HomeMatches() {
	const [rooms, setRooms] = useState([]);
	const roomsInfoApiUrl = "http://localhost:8000/api/rooms";
	useEffect(() => {
		fetch(roomsInfoApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => response.json())
			.then(data => {
				setRooms(data);
			});
	}, []);
	return (
		<div className="container pt-2 pb-2 border-top border-bottom">
			{rooms.map((room, index) => (
				<HomeMatchInfo key={index} room={room} />
			))}
		</div>
	);
}

function HomeMatchInfo() {
	return (
		<div className="text-center my-1 py-2 text-light border">
			<div className="container-fluid">1:1하실분 ㄱㄱ</div>
			<div className="row">
				<div className="col-6">
					1 vs 1
				</div>
				<div className="col-6">
					1 / 2
				</div>
			</div>
		</div>
	);
}

export default HomeMatches;
import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";

const sampleMatches = [
	{
		"id": 1,
		"p1_score": 1,
		"p2_score": 10,
		"date": "2024-05-01T12:24:37.756097Z",
		"p1": 1,
		"p2": 2
	},
	{
		"id": 2,
		"p1_score": 10,
		"p2_score": 7,
		"date": "2024-05-01T12:24:53.702258Z",
		"p1": 1,
		"p2": 2
	}
]

function MatchRecords({ userId }) {
	const [userMatchRecords, setUserMatchRecords] = useState([]);
	const userMatchRecordsApiUrl = `http://localhost:8000/api/users/${userId}/matches`;

	useEffect(() => {
		fetch(userMatchRecordsApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => response.json())
			.catch(console.log)
			.then(data => {
				setUserMatchRecords(() => data);
			})
			.catch(error => {
				console.log("in MatchRecords function", error);
				setUserMatchRecords([]);
			});
	}, [])

	return (
		<div>
			<div className="container fs-4">
				Match Records
			</div>
			<div
				className="pt-2 pb-2 border-top border-bottom rounded bg-secondary bg-opacity-25"
				style="height: 300px; overflow-y: auto;">
				{userMatchRecords.map((match) =>
					<MatchRecord match={match} userId={userId} />
				)}
			</div>
		</div>
	);
}

function MatchRecord({ match, userId }) {
	const isP1Win = match.p1_score > match.p2_score;
	const isUserP1 = match.p1 == userId;
	const isUserWin = (isUserP1 ? isP1Win : !isP1Win);

	const p1DataApiUrl = `http://localhost:8000/api/users/${match.p1}`;
	const p2DataApiUrl = `http://localhost:8000/api/users/${match.p2}`;
	const [p1NickName, setP1NickName] = useState("Player 1");
	const [p2NickName, setP2NickName] = useState("Player 2");

	useEffect(() => {
		fetch(p1DataApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => response.json())
			.catch(console.log)
			.then(data => setP1NickName(() => data.name ? data.name : "unknown"))
			.catch(console.log);

		fetch(p2DataApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => response.json())
			.catch(console.log)
			.then(data => setP2NickName(() => data.name ? data.name : "unknown"))
			.catch(console.log);
	}, [])
	return (
		<div
			className={"my-1 py-1 text-light text-center container bg-dark border-start rounded" + (isUserWin ? " border-success" : " border-danger")}
			style="user-select: none;">
			<div className="row">
				<div className="col-2">
					<div className={"my-3" + (isUserWin ? " text-success " : " text-danger ")}>
						<b>{isUserWin ? "Win" : "Lose"}</b>
					</div>
				</div>
				<div className="col-10 mt-1 py-1">
					<div className="row">
						<div className={"col-4 text-end " + (p1NickName === "unknown" ? "text-secondary" : "text-info")}
							style={p1NickName === "unknown" ? "" : "cursor: pointer;"}
							onClick={(p1NickName === "unknown" ? null : () => onClickNameInMatchRecord(match.p1))}>
							{p1NickName}
						</div>
						<div className="col-4">{match.p1_score} vs {match.p2_score}</div>
						<div className={"col-4 text-start " + (p2NickName === "unknown" ? "text-secondary" : "text-info")}
							style={p2NickName === "unknown" ? "" : "cursor: pointer;"}
							onClick={(p2NickName === "unknown" ? null : () => onClickNameInMatchRecord(match.p2))}>
							{p2NickName}
						</div>
					</div>
					<div>
						{match.date}
					</div>
				</div>
			</div>
		</div >
	);
}

function onClickNameInMatchRecord(userId) {
	navigate(`/userpage?userId=${userId}`);
}

export default MatchRecords;
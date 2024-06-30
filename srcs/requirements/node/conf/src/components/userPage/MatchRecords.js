import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import logout from "../utility/logout.js";
import tokenRefresh from "../utility/tokenRefresh.js";
import getUserData from "../utility/getUserData.js"

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

async function getUserMatchRecords(userId) {
	try {
		const response = await fetch(`http://localhost:8000/api/users/${userId}/matches`, {
			method: 'GET',
			credentials: 'include'
		});
		if (response.status === 200) {
			return await response.json();
		} else if (response.status === 401) {
			return await tokenRefresh(() => getUserMatchRecords(userId));
		} else {
			return Promise.reject("unknown");
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

function MatchRecords({ userId }) {
	const [userMatchRecords, setUserMatchRecords] = useState([]);
	useEffect(() => {
		const a = async () => {
			try {
				const _userMatchRecords = await getUserMatchRecords(userId);
				setUserMatchRecords(() => _userMatchRecords);
			} catch (error) {
				console.log("MatchRecords Error: ", error);
				logout();
			}
		}
		a();
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

	const [p1Name, setP1Name] = useState("Player 1");
	const [p2Name, setP2Name] = useState("Player 2");
	useEffect(() => {
		const a = async () => {
			try {
				if (match.p1) {
					const p1Data = await getUserData(match.p1);
					setP1Name(() => p1Data.name)
				} else {
					setP1Name(() => "unknown")
				}
				if (match.p2) {
					const p2Data = await getUserData(match.p2);
					setP2Name(() => p2Data.name)
				} else {
					setP2Name(() => "unknown")
				}
			} catch (error) {
				console.log("MatchRecord Error: ", error);
			}
		}
		a();
	}, [match.p1, match.p2])
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
						<div id={``}
							className={"col-4 text-end " + (p1Name === "unknown" ? "text-secondary" : "text-info")}
							style={p1Name === "unknown" ? "" : "cursor: pointer;"}
							onClick={(p1Name === "unknown" ? null : event => onClickNameInMatchRecord(event, match.p1))}>
							{p1Name}
						</div>
						<div className="col-4">{match.p1_score} vs {match.p2_score}</div>
						<div className={"col-4 text-start " + (p2Name === "unknown" ? "text-secondary" : "text-info")}
							style={p2Name === "unknown" ? "" : "cursor: pointer;"}
							onClick={(p2Name === "unknown" ? null : event => onClickNameInMatchRecord(event, match.p2))}>
							{p2Name}
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

function onClickNameInMatchRecord(event, userId) {
	event.preventDefault();
	navigate(`/userpage?userId=${userId}`);
}

export default MatchRecords;
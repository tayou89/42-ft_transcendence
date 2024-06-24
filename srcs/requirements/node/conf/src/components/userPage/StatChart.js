import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import ChangeMyNicknameModal from "./ChangeMyNicknameModal.js";
import DeleteMyAccountModal from "./DeleteMyAccountModal.js";

function StatChart({ myId, userData }) {
	const level = Math.floor(userData.exp / 1000);
	const nextexp = Math.floor((userData.exp + 1000) / 1000) * 1000;
	const win = userData.wins;
	const loss = userData.losses;
	return (
		<div>
			<div className="container">
				<div className="d-inline-flex">
					<div className="p-1 fs-3">{userData.name} Info</div>
					<div className="p-1 my-1">
						{myId === userData.id ? <ChangeMyNicknameModal title="Change nickname" myId={myId} /> : null}
					</div>
					<div className="p-1 mt-1">
						{myId === userData.id ? <DeleteMyAccountModal title="delete Account" myId={myId} /> : null}
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row border-top border-bottom rounded bg-secondary bg-opacity-25">
					<div className="col-md-5 text-center">
						<div className="container m-3 pt-3">
							<img className="rounded-circle"
								width="130" height="130"
								src={userData.avatar}></img>
							<div className="container mt-3 fs-5">{userData.name}</div>
						</div>
					</div>
					<div className="col-md-7">
						<div className="container m-1 text-center">
							<div className="row my-1 py-1">
								<div className="col-4">nickname</div>
								<div className="col-2">:</div>
								<div className="col-6">{userData.display_name}</div>
							</div>
							<div className="row my-1 py-1">
								<div className="col-4">Level</div>
								<div className="col-2">:</div>
								<div className="col-6">{level}</div>
							</div>
							<div className="row my-1 py-1">
								<div className="col-4">Exp</div>
								<div className="col-2">:</div>
								<div className="col-6">{userData.exp}/{nextexp}</div>
							</div>
							<div className="row my-1 py-1">
								<div className="col-4">Total</div>
								<div className="col-2">:</div>
								<div className="col-6">{win + loss}</div>
							</div>
							<div className="row my-1 py-1">
								<div className="col-4">Win</div>
								<div className="col-2">:</div>
								<div className="col-6">{win}</div>
							</div>
							<div className="row my-1 py-1">
								<div className="col-4">Lose</div>
								<div className="col-2">:</div>
								<div className="col-6">{loss}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StatChart;

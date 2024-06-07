import { useEffect, useState, MyReact } from "../MyReact/MyReact.js";
import Navbar from "./Navbar.js";
import Btn from "./utility/Btn.js";

function UserPage() {
	return (
		<div>
			<Navbar/>
			<div className="container text-light">
				<div className="container">
					<div className="row">
						<div className="col">
							<div className="container mt-2 fs-3">
								User Info
							</div>
						</div>
						<div className="col">
							<div className="container text-end my-2 mx-2">
								<Btn size="sm" text="Back" color1="secondary" color2="danger" onClickFunc={null} />
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row border-top border-bottom">
						<div className="col-md-4">
							<div className="container m-1 text-center">
								<img className="rounded-circle"
									width="120" height="120"
									src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
								<div className="container mt-1 text-center">{name}</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="container m-1 text-center">
								<div className="row mt-1 mb-1">
									<div className="col-4">Level</div>
									<div className="col-2">:</div>
									<div className="col-6">10</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Exp</div>
									<div className="col-2">:</div>
									<div className="col-6">1000/3000</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Total</div>
									<div className="col-2">:</div>
									<div className="col-6">42</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Win</div>
									<div className="col-2">:</div>
									<div className="col-6">25</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Lose</div>
									<div className="col-2">:</div>
									<div className="col-6">17</div>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="container m-1 text-center">
								<div className="row mt-1 mb-1">
									<div className="col-4">Tourn.</div>
									<div className="col-2">:</div>
									<div className="col-6 ">12</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">1 v 1</div>
									<div className="col-2">:</div>
									<div className="col-6">38</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Victory</div>
									<div className="col-2">:</div>
									<div className="col-6">5</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Left</div>
									<div className="col-2">:</div>
									<div className="col-6">25</div>
								</div>
								<div className="row mt-1 mb-1">
									<div className="col-4">Right</div>
									<div className="col-2">:</div>
									<div className="col-6">17</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="container mt-3 border-top border-bottom">
							<div className="container">
								<div className="row my-3">
									<div className="col-6">
										<div className="container text-center">
											<img className="rounded-circle" width="100" height="100"
												src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
										</div>
									</div>
									<div className="col-6">
										<div className="container text-center">
											<img className="rounded-circle" width="100" height="100"
												src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
										</div>
									</div>
								</div>
								<div className="row my-3">
									<div className="col-6">
										<div className="container text-center">
											<img className="rounded-circle" width="100" height="100"
												src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
										</div>
									</div>
									<div className="col-6">
										<div className="container text-center">
											<img className="rounded-circle" width="100" height="100"
												src="https://www.studiopeople.kr/common/img/default_profile.png"></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="container mt-3 pt-2 pb-2 border-top border-bottom">
							<div className="my-1 pt-1 pb-1">Match Record</div>
							<div className="my-1 pt-1 pb-1">Match Record</div>
							<div className="my-1 pt-1 pb-1">Match Record</div>
							<div className="my-1 pt-1 pb-1">Match Record</div>
							<div className="my-1 pt-1 pb-1">Match Record</div>
							<div className="my-1 pt-1 pb-1">Match Record</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserPage;
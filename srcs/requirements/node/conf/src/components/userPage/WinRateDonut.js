import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import "./circular_graph.css"

function WinRateDonut({ userData }) {
	return (
		<div>
			<div className="container fs-4">
				Win Rate
			</div>
			<div className="container border-top border-bottom rounded bg-secondary bg-opacity-25"
				style="height: 300px; overflow-y: auto;">
				<div className="circular-graph">
					<div className="background"></div>
					<div className="rate"></div>
					<div className="ratetext">56.9</div>
				</div>
				{/* <div className="container">
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
				</div> */}
			</div>
		</div>
	);
}

export default WinRateDonut;
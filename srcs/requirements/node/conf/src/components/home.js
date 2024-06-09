import { useEffect, useState, MyReact } from "../MyReact/MyReact.js";
import Navbar from "./Navbar.js";

function Home() {
	return (
		<div>
			<Navbar/>
			<div className="container text-light">
				<div className="container my-2 fs-3">
					Loby
				</div>
				<div className="row">
					<div className="col-md-5">
						<div className="container mb-3 pt-2 pb-2 border-top border-bottom">
							<div className="container mt-1 ">User Simple Profile</div>
						</div>
						<div className="container mt-3 mb-3 pt-2 pb-2 border-top border-bottom">
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
							<div className="container mt-1 ">Friend</div>
						</div>
					</div>
					<div className="col-md-7">
						<div className="container pt-2 pb-2 border-top border-bottom">
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
							<div className="container my-3">Match</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;

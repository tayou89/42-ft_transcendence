import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import tokenRefreshAndGoTo from "../utility/tokenRefreshAndGoTo";
import Navbar from "../Navbar.js";
import HomeMyInfo from "./homeMyInfo.js";
import HomeFriends from "./homeFriends.js";
import HomeMatches from "./homeMatches.js";

const defaultMyData = {
	"id": 0,
	"name": "default",
	"email": "default@student.42seoul.kr",
	"avatar": "https://www.studiopeople.kr/common/img/default_profile.png",
	"exp": 0,
	"wins": 0,
	"losses": 0,
	"friends": []
}

function Home() {
	const [myData, setMyData] = MyReact.useState(defaultMyData);
	const myDataApiUrl = "http://localhost:8000/api/users/me";
	MyReact.useEffect(() => {
		fetch(myDataApiUrl, {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => {
				console.log(response);
				return response.json();
			})
			.then(data => {
				console.log(data);
				if (data.detail) {
					tokenRefreshAndGoTo("/home");
				} else {
					setMyData(() => data);
				}
			})
			.catch(error => {
				console.log(error);
				navigate("/");
			});
	}, []);
	return (
		<div>
			<Navbar name={myData.name} profileImg={myData.avatar} />
			<div className="container text-light">
				<div className="row mt-3">
					<div className="col-md-5">
						<div className="fs-4">
							My Info
						</div>
						<HomeMyInfo myData={myData} />
						<div className="fs-4">
							Friends
						</div>
						<HomeFriends myFriends={myData.friends} />
					</div>
					<div className="col-md-7">
						<div className="fs-4">
							Matches
						</div>
						<HomeMatches />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;

import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import tokenRefreshAndGoTo from "../utility/tokenRefreshAndGoTo";
import Navbar from "../Navbar.js";
import HomeMyInfo from "./homeMyInfo.js";
import HomeFriends from "./homeFriends.js";
import HomeMatches from "./homeMatches.js";
import getMyData from "../utility/getMyData.js";
import logout from "../utility/logout.js";

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

	MyReact.useEffect(async () => {
		try {
			const _myData = await getMyData();
			setMyData(() => _myData);
		} catch (error) {
			logout();
		}
	}, []);

	return (
		<div>
			<Navbar />
			<div className="container text-light">
				<div className="row mt-3">
					<div className="col-md-5">
						<HomeMyInfo myData={myData} />
						<HomeFriends />
					</div>
					<div className="col-md-7">
						<HomeMatches myId={myData.id} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;

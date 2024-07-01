import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import getMyData from "../utility/getMyData.js";
import logout from "../utility/logout.js";
import tokenRefresh from "../utility/tokenRefresh.js";

function onClickasd(event) {
	event.preventDefault();
	console.log("clicked!");
}

async function getUserProfileImage(id) {
	try {
		const response = await fetch(`http://localhost:8000/api/users/${id}/avatar/`, { method: 'GET', credentials: 'include' });
		if (response.status === 200) {
			const blob = await response.blob();
			return await URL.createObjectURL(blob);
		} else if (response.status === 401) {
			return await tokenRefresh(() => getUserProfileImage(myId));
		} else {
			return Promise.reject("unknown");
		}
	} catch (error) {
		console.log("getUserProfileImage Error: ", error);
		return Promise.reject(error);
	}
}

function ChangeProfileImage({ myId }) {
	const [imageUrl, setImageUrl] = useState();
	const onchangeImageUpload = (e) => {
		const { files } = e.target;
		const uploadFile = files[0];
		const reader = new FileReader();
		reader.readAsDataURL(uploadFile);
		reader.onloadend = () => {
			setImageUrl(() => reader.result);
		}
	}
	useEffect(() => {
		try {
			const a = async () => {
				const _imageUrl = await getUserProfileImage(myId);
				setImageUrl(() => _imageUrl);
			}
			a();
		} catch (error) {

		}
	}, []);
	return (
		<div className="fs-4">
			<button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#change-profile-image-modal">
				Change profile image
			</button>
			<div className="modal text-center" id="change-profile-image-modal">
				<div className="modal-dialog">
					<div className="modal-content">

						<div className="modal-header text-dark">
							<h4 className="modal-title">Change Your Profile image!</h4>
							<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
						</div>

						<div className="modal-body">
							<div className="text-center">
								<img src={imageUrl} className="rounded-circle" img="img" style="object-fit: cover; width: 150px; height: 150px;" />
							</div>
							<div className="d-flex container px-4 mt-2">
								<input className="form-control" type="file" id="formFile" onChange={onchangeImageUpload} />
								<button className="btn btn-primary">Submit</button>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

export default ChangeProfileImage;

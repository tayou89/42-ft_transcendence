import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";

function onClickasd(event) {
	event.preventDefault();
	console.log("clicked!");
}

function ChangeProfileImage({ myId }) {
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
							<div className="mb-3">
								<label for="formFile" className="form-label">Default file input example</label>
								<input className="form-control" type="file" id="formFile" />
								<div className="text-end">
									<div id="change-name-status" className="container mt-2 text-success"></div>
									<button className="btn btn-primary mt-3">Submit</button>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

export default ChangeProfileImage;

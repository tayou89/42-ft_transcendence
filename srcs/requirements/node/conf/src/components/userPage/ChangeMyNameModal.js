import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Navbar from "../Navbar.js";
import Btn from "../utility/Btn.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import tokenRefreshAndGoTo from "../utility/tokenRefreshAndGoTo";

function onClickSubmit(event, myId) {
	event.preventDefault();
	const input = event.target.parentNode.querySelector("#change-name-input");
	fetch(`http://localhost:8000/api/users/${myId}/`, {
		method: 'PATCH',
		credentials: 'include',
		body: JSON.stringify({
			name: input.value
		})
	})
		.then(response => {
			console.log(response);
			return response.json();
		})
		.then(data => {
			console.log(data);
			if (data.result === "Successfully Changed!") {
				modifyCommentMsg("Successfully Changed!", true);
			} else {
				modifyCommentMsg(data.result, false);
			}
		})
		.catch(error => {
			modifyCommentMsg("Network Error!", false);
			console.log(error);
		});
}

function modifyCommentMsg(msg, isSuccess) {
	const comment = document.querySelector("#change-name-status");
	if (comment) {
		comment.classList.remove("text-success");
		comment.classList.remove("text-danger");
		comment.innerText = msg;
		if (isSuccess === true) {
			comment.classList.add("text-success");
		} else {
			comment.classList.add("text-danger");
		}
	}
}

function ChangeMyNameModal({ title, myId }) {
	return (
		<div className="fs-4">
			<button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#change-name-modal">
				{title}
			</button>
			<div className="modal text-center" id="change-name-modal">
				<div className="modal-dialog">
					<div className="modal-content">

						<div className="modal-header text-dark">
							<h4 className="modal-title">Change Your name!</h4>
							<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
						</div>

						<div className="modal-body">
							<form className="container my-1 py-1">
								<input id="change-name-input" className="me-1" type="text" placeholder="Your new name" />
								<Btn size="md" text="Submit" onClickFunc={(event) => onClickSubmit(event, myId)} />
							</form>
							<div id="change-name-status" className="container mt-2 text-success">
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

export default ChangeMyNameModal;

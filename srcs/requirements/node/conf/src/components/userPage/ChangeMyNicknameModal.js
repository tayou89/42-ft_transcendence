import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";

function isNonAlphanumeric(input) {
	const alphanumericRegex = /^[a-zA-Z0-9]*$/;
	return !alphanumericRegex.test(input.value);
}

function onClickSubmit(event, myId) {
	event.preventDefault();
	const input = event.target.parentNode.querySelector("#change-name-input");
	if (input.value.length < 2) {
		modifyCommentMsg("name too short!", false);
	} else if (input.value.length > 16) {
		modifyCommentMsg("name too long!", false);
	} else if (isNonAlphanumeric(input)) {
		modifyCommentMsg("Only alphabets and numbers are available", false);
	} else {
		fetch(`http://localhost:8000/api/users/${myId}/`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				display_name: input.value
			})
		})
			.then(response => {
				if (response.status === 200) {
					modifyCommentMsg("successfully changed!", true);
				} else {
					modifyCommentMsg("failed!", false);
				}
			})
			.catch(error => {
				modifyCommentMsg("Network Error!", false);
				console.log("in ChangeMyNicknameModal file onClickSubmit function", error);
			});
	}
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

function ChangeMyNicknameModal({ title, myId }) {
	return (
		<div className="fs-4">
			<button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#change-name-modal">
				{title}
			</button>
			<div className="modal text-center" id="change-name-modal">
				<div className="modal-dialog">
					<div className="modal-content">

						<div className="modal-header text-dark">
							<h4 className="modal-title">Change Your nickname!</h4>
							<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
						</div>

						<div className="modal-body">
							<form className="container my-1 py-1">
								<input id="change-name-input" className="me-1" type="text" placeholder="Your new nickname" />
								<button className="btn btn-primary btn-md" onClick={(event) => onClickSubmit(event, myId)}>Submit</button>
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

export default ChangeMyNicknameModal;

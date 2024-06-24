import { useEffect, useState, MyReact } from "../../MyReact/MyReact.js";
import Navbar from "../Navbar.js";
import { navigate } from "../../MyReact/MyReactRouter.js";
import tokenRefreshAndGoTo from "../utility/tokenRefreshAndGoTo";

function onClickDeleteAccount(event, myId) {
	event.preventDefault();
	const input = event.target.parentNode.querySelector("#delete-account-input");
	if (input.value === "delete") {
		fetch(`http://localhost:8000/api/withdraw`, {
			method: 'POST',
			credentials: 'include'
		})
			.then(response => {
				if (response.status === 200) {
					navigate("/");
				} else {
					modifyCommentMsg("delete failed!", false);
				}
			})
			.catch(error => {
				modifyCommentMsg("Network Error!", false);
				console.log("in onClickDeleteAccount function", error);
			});
	} else {
		modifyCommentMsg("input 'delete'", false);
	}
}

function modifyCommentMsg(msg, isSuccess) {
	const comment = document.querySelector("#delete-account-status");
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

function DeleteMyAccountModal({ title, myId }) {
	return (
		<div className="fs-4">
			<button type="button" className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#delete-account-modal">
				{title}
			</button>
			<div className="modal text-center" id="delete-account-modal">
				<div className="modal-dialog">
					<div className="modal-content">

						<div className="modal-header text-dark">
							<h4 className="modal-title">Are you sure you want to do this?</h4>
							<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
						</div>

						<div className="modal-body">
							<div className="container text-dark">
								Enter '<b className="text-danger"><i>delete</i></b>' to delete the account.
							</div>
							<form className="container my-1 py-1">
								<input id="delete-account-input" className="me-1" type="text" />
								<button type="button" className="btn btn-danger btn-md" data-bs-dismiss="modal" onClick={(event) => onClickDeleteAccount(event, myId)}>
									delete Account
								</button>
							</form>
							<div id="delete-account-status" className="container mt-2 text-success">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DeleteMyAccountModal;

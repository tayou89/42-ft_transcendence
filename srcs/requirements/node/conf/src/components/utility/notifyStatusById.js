function notifyStatusById(msg, isSuccess, id, displayTime = 2500, isErase = false) {
	const comment = document.querySelector(`#${id}`);
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
	if (!isErase) {
		setTimeout(() => notifyStatusById("", true, id, displayTime, true), displayTime);
	}
}

export default notifyStatusById;
function setInnerTextById(msg, isSuccess, id, isErase = false) {
	console.log(msg);
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
		setTimeout(() => setInnerTextById("", true, id, true), 2500);
	}
}

export default setInnerTextById;
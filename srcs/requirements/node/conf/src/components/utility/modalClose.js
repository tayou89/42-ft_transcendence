import { Modal } from 'bootstrap';

function modalCloseById(modalId) {
	const modalElement = document.getElementById(modalId);
	if (modalElement) {
		const modalInstance = Modal.getInstance(modalElement);
		modalInstance.hide();
	}
}

export default modalCloseById;
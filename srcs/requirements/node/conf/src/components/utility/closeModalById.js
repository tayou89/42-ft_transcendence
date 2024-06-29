import { Modal } from 'bootstrap';

function closeModalById(modalId) {
	const modalElement = document.getElementById(modalId);
	if (modalElement) {
		const modalInstance = Modal.getInstance(modalElement);
		modalInstance.hide();
	}
}

export default closeModalById;
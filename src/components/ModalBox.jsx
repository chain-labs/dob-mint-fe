import React from "react";
import { Modal } from "react-bootstrap";
import "../style/style.scss";

const ModalBox = ({ show, onHide }) => {
	return (
		<Modal
			id="order-now--modal"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={show}
			onHide={onHide}
		>
			<Modal.Header closeButton className="my_modal">
				<Modal.Title> THANKYOU FOR BUYING</Modal.Title>
			</Modal.Header>
            <Modal.Body>

			NFT BOUGHT SUCCESSFULLY
            </Modal.Body>
		</Modal>
	);
};

export default ModalBox;

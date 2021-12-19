import React, { Children } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";


const ModalBox = ({
   show 
}) => {
	return (
		<Modal
        id="order-now--modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        // onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Connect With Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
      </Modal>
	);
};

export default ModalBox;

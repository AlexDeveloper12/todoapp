import React from "react";
import ReactModal from "react-modal";
import { Modal, Button } from "react-bootstrap";

const customStyles = {
    content: {
        top: '30%',
        left: '30%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50)',
    },
};

ReactModal.setAppElement('#root');

function ValidationModal({ isModalOpen, toggleModal }) {

    return (
        <div>

            <Modal
                show={isModalOpen}
                onHide={toggleModal}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Header>
                    <Modal.Title>
                        Validation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <span>
                        Please ensure that you enter a value for your to-do item
                    </span>
                </Modal.Body>

                <Modal.Footer>

                <Button className="btn-danger" onClick={toggleModal}>Close</Button>
                </Modal.Footer>

            </Modal>

        </div>
    )

}

export default ValidationModal;
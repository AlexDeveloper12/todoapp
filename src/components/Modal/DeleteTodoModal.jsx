import React from "react";
import ReactModal from "react-modal";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        width: '50%',
        height: '50%'
    },
};

function DeleteTodoModal({ id, isDeleteOpen, deleteTodo, toggleDeleteModal }) {
    return (
        <>
            <Modal
                show={isDeleteOpen}
                onHide={toggleDeleteModal}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Header>
                    <Modal.Title>
                        Delete To-do item
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete this todo item ?
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn btn-danger" onClick={() => deleteTodo(id)}>Delete</Button>
                    <Button className="btn btn-primary" onClick={toggleDeleteModal}>Cancel</Button>

                </Modal.Footer>



            </Modal>
        </>
    )
}

export default DeleteTodoModal;
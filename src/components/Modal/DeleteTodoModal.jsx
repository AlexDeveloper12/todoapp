import React from "react";
import { Button,Modal } from "react-bootstrap";

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
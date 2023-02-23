import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../Modal/EditTodoModal.css";

function EditTodoModal({ data, isEditModalOpen, handleText, handleIsComplete, updateTodo, toggleEditModal }) {

    return (
        <>

            <Modal
                show={isEditModalOpen}
                onHide={toggleEditModal}
                backdrop="static"
                keyboard={false}>

                <Modal.Header>
                    <Modal.Title>
                        Edit To-do item
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <div className="input-container">
                            <label className="edit-todo-label">Name:</label>
                            <input type="text" className="edit-todo-name edit-todo" name="updatetodoname" value={data.name} onChange={(event) => handleText(event)} />
                        </div>

                        <div className="input-container">
                            <label className="edit-todo-label">Is Complete?</label>
                            <input type="checkbox" value={data.isComplete} checked={data.isComplete} onChange={(e) => handleIsComplete(data.id, e)} />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn btn-primary" onClick={() => updateTodo(data.id, data.name, data.isComplete)}>Update</Button>
                    <Button className="btn btn-danger" onClick={toggleEditModal}>Cancel</Button>

                </Modal.Footer>


            </Modal>
        </>
    )

}

export default EditTodoModal;
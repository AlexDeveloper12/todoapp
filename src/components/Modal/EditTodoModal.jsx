import React from "react";
import ReactModal from "react-modal";
import "../Modal/EditTodoModal.css";

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

function EditTodoModal({ data, isEditModalOpen, handleText, handleIsComplete, updateTodo,toggleEditModal }) {
    console.log(`${data.name}`)

    return (
        <div>
            <ReactModal
                isOpen={isEditModalOpen}
                style={customStyles}
            >
                <form>
                    <div className="input-container">
                        <label className="edit-todo-label">Name:</label>
                        <input type="text" className="edit-todo-name edit-todo" name="addtodoname" value={data.name} onChange={(event) => handleText(event)} />
                    </div>

                    <div className="input-container">
                        <label className="edit-todo-label">Is Complete?</label>
                        <input type="checkbox" value={data.isComplete} checked={data.isComplete} onChange={(e) => handleIsComplete(data.id,e)} />
                    </div>

                    <div className="btn-update-container">
                        <button type="button" className="btn btn-success" onClick={()=>updateTodo(data.id,data.name,data.isComplete)} >Update</button>
                        <button type="button" className="btn btn-danger" onClick={toggleEditModal}>Cancel</button>
                    </div>

                </form>

            </ReactModal>
        </div>
    )

}

export default EditTodoModal;
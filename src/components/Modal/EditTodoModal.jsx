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
        width:'50%',
        height:'50%'
    },
};

function EditTodoModal({ data, isEditModalOpen,handleText,handleIsComplete }) {

    return (
        <div>
            <ReactModal
                isOpen={isEditModalOpen}
                style={customStyles}
            >
                <form>
                    <div>
                        <label className="edit-todo-label">Name:</label>
                        <input type="text" className="edit-todo-name edit-todo" name="addtodoname" value={data.name} onChange={(event)=>handleText(event)} />
                    </div>
                    <div>
                        <label className="edit-todo-label">Description:</label>
                        <textarea className="edit-todo-description edit-todo" name="addtododescription" value={data.description} onChange={(event)=>handleText(event)} />
                    </div>

                    <div>
                        <label className="edit-todo-label">Is Complete?</label>
                        <input type="checkbox" value={data.isComplete} checked={data.isComplete} onChange={() => handleIsComplete(id)} />
                    </div>

                    <div>
                        <button type="button" className="btn-update">Update</button>
                    </div>

                </form>

            </ReactModal>
        </div>
    )

}

export default EditTodoModal;
import React from "react";
import ReactModal from "react-modal";

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
        <div>
            <ReactModal
                isOpen={isDeleteOpen}
                style={customStyles}
            >

                <div className="row text-center">
                    <div className="col-md-12">
                        Are you sure you want to delete this todo item ?
                    </div>
                </div>

                <div className="row text-center my-2 text-right">
                    <div className="col-md-4">
                        <button type="button" className="btn btn-danger" onClick={() => deleteTodo(id)}>Delete</button>
                    </div>
                    <div className="col-md-4">
                        <button type="button" className="btn btn-primary" onClick={toggleDeleteModal} >Cancel</button>
                    </div>

                </div>


            </ReactModal>
        </div>
    )
}

export default DeleteTodoModal;
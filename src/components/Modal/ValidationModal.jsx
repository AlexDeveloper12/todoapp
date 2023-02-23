import React from "react";
import ReactModal from "react-modal";

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
            <ReactModal
                isOpen={isModalOpen}
                style={customStyles}
            >
                <span>
                    Please ensure that you enter a value for your to-do item
                </span>

                <div className="text-center mt-3">
                    <button type="button" className="btn btn-danger" onClick={toggleModal}>Close</button>
                </div>



            </ReactModal>

        </div>
    )

}

export default ValidationModal;
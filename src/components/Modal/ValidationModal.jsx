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
                    Please ensure that you enter a name and a description when adding to your to-do list
                </span>

                <div style={{textAlign:'center',marginTop:'30px'}}>
                    <button type="button" className="btn-close" onClick={toggleModal}>Close</button>
                </div>



            </ReactModal>

        </div>
    )

}

export default ValidationModal;
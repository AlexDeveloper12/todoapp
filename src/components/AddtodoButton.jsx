import React from "react";

function AddtodoButton({ btnAction }) {

    return (
        <button type="submit"
            className="btn btn-block mt-3 btn-success"
            onClick={btnAction}>
            Add
        </button>
    )

}

export default AddtodoButton;
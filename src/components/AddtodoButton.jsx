import React from "react";

function AddtodoButton({btnAction}){
    
    return (
        <button type="button" 
            className="btn-addtodo" 
            onClick={btnAction}
            >
                Add
            </button>
    )

}

export default AddtodoButton;
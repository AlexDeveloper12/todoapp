import React from "react";
import "../components/Addtodo.css";

function AddtodoName({ input, handleChange }) {
    return (
        <>
            <input type="text"
                className="add-todo"
                value={input}
                onChange={handleChange}
                name={"addtodoname"}
                placeholder="Name"
                maxLength={30}
            />
        </>
    )

}

export default AddtodoName;
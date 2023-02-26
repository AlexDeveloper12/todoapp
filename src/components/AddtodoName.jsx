import React from "react";
import "../components/Addtodo.css";

function AddtodoName({ input, handleChange }) {
    return (
        <>
            <input type="text"
                className="form-control"
                value={input}
                onChange={handleChange}
                name={"addtodoname"}
                placeholder="New To-do item"
                maxLength={100}
            />
        </>
    )

}

export default AddtodoName;
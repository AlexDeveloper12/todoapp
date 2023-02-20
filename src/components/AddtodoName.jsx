import React from "react";
import "../components/Addtodo.css";

function AddtodoName({ input, handleChange }) {
    return (
        <div>

            <input type="text"
                className="add-todo"
                value={input}
                onChange={handleChange}
                name={"addtodoname"}
            />

        </div>
    )

}

export default AddtodoName;
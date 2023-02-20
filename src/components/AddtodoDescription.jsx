import React from "react";
import "../components/Addtodo.css";

function AddtodoDescription({input,handleChange}){
    return(
        <div>

        <input type="text"
            className="add-todo"
            value={input}
            onChange={handleChange}
            name={"addtododescription"}
        />

    </div>
    )

}

export default AddtodoDescription;
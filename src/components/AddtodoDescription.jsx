import React from "react";
import "../components/Addtodo.css";

function AddtodoDescription({input,handleChange}){
    return(
        <>

        <textarea type="text"
            className="add-todo addtodo-textarea"
            value={input}
            onChange={handleChange}
            name={"addtododescription"}
            cols="40"
            rows="5"
            placeholder="Description"
            maxLength={200}
        />

    </>
    )

}

export default AddtodoDescription;
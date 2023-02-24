import React from "react";
import { Button } from "react-bootstrap";

function AllCompleteButton({btnSetAllComplete}){
    return(
        <div className="col-md-4">
            <button type="button" className="btn btn-secondary btn-block mt-1" onClick={btnSetAllComplete}>Set all To-do items to complete</button>
        </div>
    )

}

export default AllCompleteButton;
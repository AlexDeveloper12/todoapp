import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

function Note({ localNote }) {
    const { id, name, description, isComplete, toggleEdit } = localNote;

    return (
        <>
            <li className="list-group-item d-flex justify-content-between my-2">

                <div className="col-md-5">
                    <span className="mt-1 mb-0 align-middle">{name}</span>
                </div>
                <div className="col-md-5">
                    <span className="mt-1 mb-0 align-middle">{description}</span>
                </div>
                <div className="col-md-2">
                    <span
                        className="mx-2 text-warning">
                        <i className="fa fa-pencil" onClick={toggleEdit} />
                    </span>
                    <span
                        className="mx-2 text-danger">
                        <i className="fa fa-trash" />
                    </span>
                </div>
            </li>

        </>


    )

}

export default Note;
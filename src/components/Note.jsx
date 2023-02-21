import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

function Note({ localNote }) {
    const { id, name, description, isComplete } = localNote;

    return (
        <>
            <li className="list-group-item d-flex justify-content-between my-2">

            </li>
            <div className="row">
                <div className="col-md-6">
                    <span className="mt-1 mb-0 align-middle">{name}</span>
                </div>
                <div className="col-md-6">
                    <span className="mt-1 mb-0 align-middle">{description}</span>
                </div>

            </div>

            <div>
                <span
                    className="mx-2 text-warning">
                    <i className="fas fa-pen" />
                </span>
                <span
                    className="mx-2 text-danger">
                    <i className="fas fa-trash" />
                </span>
            </div>
        </>


    )

}

export default Note;
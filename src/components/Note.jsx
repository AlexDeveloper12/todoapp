import React from "react";

function Note({ localNote,toggleEdit,toggleDelete }) {
    const { id, name, description } = localNote;

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
                        <i className="fa fa-pencil" onClick={()=>toggleEdit(localNote)} />
                    </span>
                    <span
                        className="mx-2 text-danger">
                        <i className="fa fa-trash" onClick={()=>toggleDelete(id)} />
                    </span>
                </div>
            </li>

        </>


    )

}

export default Note;
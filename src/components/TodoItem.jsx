import React from "react";

function TodoItem({ localNote, toggleEdit, toggleDelete }) {
    const { id, name, isComplete } = localNote;

    return (
        <>
            <tr>
                <td className="col-md-8">
                    <span className={"mt-1 mb-0 align-middle " + (isComplete ? "todo-completed" : "")}>{name}</span>
                </td>
                <td className="col-md-2">
                    <span
                        className="mx-2 text-warning mr-3">
                        <i className="fa fa-pencil" style={{fontSize:'25px'}} onClick={() => toggleEdit(localNote)} />
                    </span>
                    <span
                        className="mx-2 text-danger">
                        <i className="fa fa-trash" style={{fontSize:'25px'}} onClick={() => toggleDelete(id)} />
                    </span>
                </td>
            </tr>
        </>
    )

}

export default TodoItem;
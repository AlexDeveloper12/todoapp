import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import EditTodoModal from "./Modal/EditTodoModal";

function Notes({ localStorageNotes, handleIsComplete, toggleEditModal }) {
    return (
        <tr>
            {
                localStorageNotes.map((value) => {

                    const { id, name, description, isComplete } = value;
                    console.log(`Notes isComplete: ${isComplete}`)

                    return (
                        <>
                            <td>
                                {id}
                            </td>
                            <td>
                                {name}
                            </td>
                            <td>
                                {description}
                            </td>
                            <td> <input type="checkbox" disabled value={isComplete} checked={isComplete}  /></td>
                            <td>
                                <FaPencilAlt onClick={() => toggleEditModal(value)} />
                            </td>
                            <td>
                                <FaTrash />
                            </td>
                        </>
                    )
                })
            }
        </tr>

    )

}

export default Notes;
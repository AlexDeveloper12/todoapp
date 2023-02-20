import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

function Notes({ localStorageNotes }) {
    return (
        <tr>
            {
                localStorageNotes.map((value) => {

                    const { id, name, description, isComplete } = value;

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
                            <td>{isComplete}</td>
                            <td>
                                <FaPencilAlt />
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
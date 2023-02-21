import React from "react";
import {FaPencilAlt,FaTrash} from "react-icons/fa";

function Notes({ localStorageNotes, handleIsComplete }) {
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
                            <td> <input type="checkbox" value={isComplete} checked={isComplete} onChange={()=>handleIsComplete(id)} /></td>
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
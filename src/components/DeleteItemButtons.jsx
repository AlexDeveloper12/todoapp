import React from "react";

function DeleteItemButtons({ deleteCompletedTodos, deleteAllTodos }) {

    return (
        <>

            <div className="col-md-6">
                <button
                    type="button"
                    className="btn btn-secondary btn-block mt-1" onClick={deleteCompletedTodos} >
                    Delete completed To-do items
                </button>
            </div>

            <div className="col-md-6">
                <button
                    type="button"
                    className="btn btn-secondary btn-block mt-1" onClick={deleteAllTodos}>
                    Delete all To-do items
                </button>
            </div>
        </>
    )
}

export default DeleteItemButtons;



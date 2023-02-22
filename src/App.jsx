import { useEffect, useState } from 'react'
import './App.css'
import AddtodoName from './components/AddtodoName';
import AddtodoButton from './components/AddtodoButton';
import ValidationModal from './components/Modal/ValidationModal';
import EditTodoModal from './components/Modal/EditTodoModal';
import DeleteTodoModal from './components/Modal/DeleteTodoModal';
import TodoItem from './components/TodoItem';

function App() {

  const [name, setName] = useState("");
  const [isComplete, setIsComplete] = useState(0);
  const [id, setId] = useState(0);
  const [notes, setNotes] = useState([]);
  const [isValidationModalOpen, setisValidationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [deleteChosenId, setDeleteChosenId] = useState(0);

  useEffect(() => {
    getNotes();
  }, [])

  const addTodoInformation = () => {
    //here will be the code to set the note in the local storage so it is available after user leaves browser
    var newId = Math.random();

    if (name.length > 0) {
      setId(newId);
      //set local storage key
      let todoNote = {
        id: id,
        name: name,
        isComplete: 0
      }

      localStorage.setItem(`todonote-${todoNote.id}`, JSON.stringify(todoNote));
      getNotes();
      setName("");
    } else {
      setisValidationModalOpen(true);
    }

  }

  const getNotes = () => {
    let tempArray = []
    for (var i = 0; i < localStorage.length; i++) {

      //set iteration key name
      var key = localStorage.key(i);

      //use key name to retrieve the corresponding value

      var value = JSON.parse(localStorage.getItem(key));

      tempArray.push(value);
    }

    setNotes(tempArray);

  }

  const handleInput = (event) => {

    const { name, value } = event.target;

    switch (name) {
      case "addtodoname":
        setName(value);
        break;
    }
  }

  const toggleValidationModal = () => {
    setisValidationModalOpen(!isValidationModalOpen);
  }

  const toggleEditModal = (data) => {
    setIsEditModalOpen(!isEditModalOpen);
    setModalData(data);
  }

  const toggleDeleteModal = (id) => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setDeleteChosenId(id);

  }

  const handleIsComplete = (todoId, event) => {
    let tempValue = JSON.parse(localStorage.getItem(`todonote-${todoId}`))
    console.log(tempValue);
    tempValue.isComplete = tempValue.isComplete == 0 ? 1 : 0
    localStorage.setItem(`todonote-${todoId}`, JSON.stringify(tempValue));
    setIsComplete(event.target.checked)
    //getNotes();
  }

  const updateTodoItem = (todoId, name, description, isComplete) => {
    let tempTodoItem = JSON.parse(localStorage.getItem(`todonote-${todoId}`));
    tempTodoItem.name = name;
    tempTodoItem.description = description;
    tempTodoItem.isComplete = isComplete;
    localStorage.setItem(`todonote-${todoId}`, JSON.stringify(tempTodoItem));
    setIsEditModalOpen(false);
  }

  const deleteTodo = (id) => {
    console.log(id)
    if (id !== null) {
      localStorage.removeItem(`todonote-${id}`);
      toggleDeleteModal();
      getNotes();
    }

  }

  const deleteAllTodos = () => {
    localStorage.clear();
    getNotes();
  }

  const deleteCompletedTodos = () => {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = JSON.parse(localStorage.getItem(key))
      console.log(`key-${key} value-${value}`)

      if (value.isComplete === 1) {
        localStorage.removeItem(`todonote-${value.id}`);
        console.log('this is complete')

      }
    }
  }

  return (
    <div className="container">

      <h3 className="text-center">To-do list</h3>

      <div className="card card-body my-3">

        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text bg-info text-white">
              <i className="fa fa-book" />
            </div>
          </div>


          <AddtodoName
            input={name}
            handleChange={handleInput}
          />
        </div>

        <div className="text-center">
          <AddtodoButton
            btnAction={addTodoInformation}
          />
        </div>
      </div>

      {
        
        notes.length > 0 ?
        <>
        <label>Count: {notes.length}</label>

          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                notes.map(value => {
                  return (
                    <TodoItem
                      localNote={value}
                      toggleEdit={toggleEditModal}
                      toggleDelete={toggleDeleteModal}
                    />
                  )
                })
              }
            </tbody>

          </table>
          </>
          : <label>No To-dos </label>
          
      }
      <div className="row mt-4">
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-danger btn-block mt-1" onClick={deleteCompletedTodos} >
            Delete completed To-do items
          </button>
        </div>

        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-danger btn-block mt-1" onClick={deleteAllTodos}>
            Delete all To-do items
          </button>
        </div>

        {
          isEditModalOpen ?
            <EditTodoModal
              data={modalData}
              isEditModalOpen={isEditModalOpen}
              handleIsComplete={handleIsComplete}
              updateTodo={updateTodoItem}
            />
            : null
        }

        {
          isValidationModalOpen ?
            <ValidationModal
              isModalOpen={isValidationModalOpen}
              toggleModal={toggleValidationModal} />
            : null
        }

        {
          isDeleteModalOpen ?
            <DeleteTodoModal
              deleteTodo={deleteTodo}
              isDeleteOpen={isDeleteModalOpen}
              toggleDeleteModal={toggleDeleteModal}
              id={deleteChosenId}
            />
            : null
        }




      </div>



    </div>
  )
}

export default App

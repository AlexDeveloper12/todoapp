import { useEffect, useState } from 'react'
import './App.css'
import AddtodoName from './components/AddtodoName';
import AddtodoButton from './components/AddtodoButton';
import Note from './components/Note';
import ValidationModal from './components/Modal/ValidationModal';
import EditTodoModal from './components/Modal/EditTodoModal';
import DeleteTodoModal from './components/Modal/DeleteTodoModal';

function App() {

  const [name, setName] = useState("");
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

    if (name.length > 0) {
      setId(id + 1);
      //set local storage key
      let todoNote = {
        id: id,
        name: name,
        isComplete: 0
      }

      localStorage.setItem(`todonote-${todoNote.id}`, JSON.stringify(todoNote));
      getNotes();
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

  const handleIsComplete = (todoId) => {
    let tempValue = JSON.parse(localStorage.getItem(`todonote-${todoId}`))
    console.log(tempValue);
    tempValue.isComplete = tempValue.isComplete == 0 ? 1 : 0
    localStorage.setItem(`todonote-${todoId}`, JSON.stringify(tempValue));
    getNotes();
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

  return (
    <div className="container">

      <h3 className="text-center">Notes</h3>

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
          <ul className="list-group my-5">
            {
              notes.map(value => {
                return (
                  <Note
                    localNote={value}
                    toggleEdit={toggleEditModal}
                    toggleDelete={toggleDeleteModal}
                  />
                )
              })
            }
          </ul>

          : null

      }
      <div className="row mt-4">
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-danger btn-block mt-1">
            Delete completed tasks
          </button>
        </div>

        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-danger btn-block mt-1">
            Delete all tasks
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

import { useEffect, useState } from 'react'
import './App.css'
import AddtodoName from './components/AddtodoName';
import AddtodoButton from './components/AddtodoButton';
import ValidationModal from './components/Modal/ValidationModal';
import EditTodoModal from './components/Modal/EditTodoModal';
import DeleteTodoModal from './components/Modal/DeleteTodoModal';
import TodoItem from './components/TodoItem';
import DeleteItemButtons from './components/DeleteItemButtons';

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
    
    var newId = Math.floor(Math.random() * 100000);

    if (name.length > 0) {
      setId(newId);
      
      let todoNote = {
        id: newId,
        name: name,
        isComplete: 0
      }

      localStorage.setItem(`todonote-${newId}`, JSON.stringify(todoNote));
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
      case "updatetodoname":
        var currentModalData = { ...modalData };
        currentModalData.name = value;
        setModalData(currentModalData);
        break;
    }
  }

  const handleIsComplete = (event) => {
    var currentModalData = { ...modalData };
    currentModalData.isComplete = event.target.checked;
    setModalData(currentModalData);
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

  const updateTodoItem = (todoId, name, isComplete) => {
    let tempTodoItem = JSON.parse(localStorage.getItem(`todonote-${todoId}`));
    tempTodoItem.name = name;
    tempTodoItem.isComplete = isComplete;
    localStorage.setItem(`todonote-${todoId}`, JSON.stringify(tempTodoItem));
    setIsEditModalOpen(false);
    getNotes();
  }

  const deleteTodo = (id) => {
    if (id !== null) {
      localStorage.removeItem(`todonote-${id}`);
      toggleDeleteModal();
      getNotes();
    }

  }

  const deleteAllTodos = () => {
    if (localStorage.length > 0) {
      localStorage.clear();
      getNotes();
    }
  }

  const deleteCompletedTodos = () => {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage.getItem(key))

        if (value.isComplete) {
          localStorage.removeItem(`todonote-${value.id}`);
          getNotes();

        }
      }
    }

  }

  return (
    <div className="container">

      <h3 className="text-center">To-do list</h3>

      <div className="card card-body my-3">

        <div className="input-group">

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
                  notes.map((value,index)=>{
                    return (
                      <TodoItem
                        localNote={value}
                        toggleEdit={toggleEditModal}
                        toggleDelete={toggleDeleteModal}
                        key={index}
                      />
                    )
                  })
                }

              </tbody>

            </table>
          </>
          : <label>No To-do items </label>

      }
      <div className="row mt-4">

        <DeleteItemButtons
          deleteCompletedTodos={deleteCompletedTodos}
          deleteAllTodos={deleteAllTodos}
        />

        {
          isEditModalOpen ?
            <EditTodoModal
              data={modalData}
              isEditModalOpen={isEditModalOpen}
              handleIsComplete={handleIsComplete}
              updateTodo={updateTodoItem}
              toggleEditModal={toggleEditModal}
              handleText={handleInput}
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

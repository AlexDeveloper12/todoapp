import { useEffect, useState } from 'react'
import './App.css'
import AddtodoName from './components/AddtodoName';
import AddtodoButton from './components/AddtodoButton';
import ValidationModal from './components/Modal/ValidationModal';
import EditTodoModal from './components/Modal/EditTodoModal';
import DeleteTodoModal from './components/Modal/DeleteTodoModal';
import TodoItem from './components/TodoItem';
import DeleteItemButtons from './components/DeleteItemButtons';
import { FilterValues } from './components/Utils/filterValues';
import FilterRadioButton from './components/FilterRadioButton';
import AllCompleteButton from './components/AllCompleteButton';
import moment from "moment";

function App() {

  const [name, setName] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [isValidationModalOpen, setisValidationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [deleteChosenId, setDeleteChosenId] = useState(0);
  const [todoItemsFilter, setTodoItemsFilter] = useState([]);

  useEffect(() => {
    getTodoItems();
  }, [])

  const addTodoInformation = () => {

    var newId = Math.floor(Math.random() * 100000);

    const dateNow = moment().format("DD/MM/YYYY HH:mm").toString();
    console.log(dateNow)

    if (name.length > 0) {
      let todoItem = {
        id: newId,
        name: name,
        isComplete: 0,
        dateAdded:dateNow
      }

      localStorage.setItem(`todoitem-${newId}`, JSON.stringify(todoItem));
      getTodoItems();
      setName("");
    } else {
      setisValidationModalOpen(true);
    }

  }

  const getTodoItems = () => {
    let tempArray = []
    for (var i = 0; i < localStorage.length; i++) {

      //set iteration key name
      var key = localStorage.key(i);

      //use key name to retrieve the corresponding value

      var value = JSON.parse(localStorage.getItem(key));

      tempArray.push(value);
    }

    setTodoItems(tempArray);
    setTodoItemsFilter(tempArray);

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
    let tempTodoItem = JSON.parse(localStorage.getItem(`todoitem-${todoId}`));
    tempTodoItem.name = name;
    if (isComplete) {
      tempTodoItem.isComplete = 1;
    } else {
      tempTodoItem.isComplete = 0;
    }

    localStorage.setItem(`todoitem-${todoId}`, JSON.stringify(tempTodoItem));
    setIsEditModalOpen(false);
    getTodoItems();
  }

  const deleteTodo = (id) => {
    if (id !== null) {
      localStorage.removeItem(`todoitem-${id}`);
      toggleDeleteModal();
      getTodoItems();
    }

  }

  const deleteAllTodos = () => {
    if (localStorage.length > 0) {
      localStorage.clear();
      getTodoItems();
    }
  }

  const deleteCompletedTodos = () => {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage.getItem(key))

        if (value.isComplete) {
          localStorage.removeItem(`todoitem-${value.id}`);
          getTodoItems();

        }
      }
    }

  }

  const handleFilterChange = (event) => {

    var trimValue = event.target.value;

    var items = [...todoItems];

    switch (trimValue) {
      case "All":
        items = todoItems;
        break;
      case "Completed":
        items = items.filter(item => item.isComplete === 1);
        break;
      case "NotCompleted":
        items = items.filter(item => item.isComplete === 0);
        break;

    }
    setTodoItemsFilter(items);
  }

  const setAllTodoItemsComplete = () => {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);

        let todoItem = JSON.parse(localStorage.getItem(`${key}`));
        if (todoItem.isComplete === 0) {
          todoItem.isComplete = 1;
          localStorage.setItem(key, JSON.stringify(todoItem));
        }
      }
      getTodoItems();
    }
  }

  return (
    <div className="container">

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

      <h3 className="text-center">To-do List</h3>

      <div className="text-center">
        {
          FilterValues.map(({ label, value }, index) => {
            return (
              <FilterRadioButton
                label={label}
                value={value}
                index={index}
                handleFilterChange={handleFilterChange}
                key={index}
              />

            )
          })
        }

      </div>

      {

        todoItemsFilter.length > 0 ?
          <>
            <label>Count: {todoItemsFilter.length}</label>

            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {
                  todoItemsFilter.map((value, index) => {
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

        <AllCompleteButton
          btnSetAllComplete={setAllTodoItemsComplete}
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

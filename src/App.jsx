import { useEffect, useState } from 'react'
import './App.css'
import AddtodoName from './components/AddtodoName';
import AddtodoDescription from './components/AddtodoDescription';
import AddtodoButton from './components/AddtodoButton';
import Notes from './components/Notes';
import ValidationModal from './components/Modal/ValidationModal';
import EditTodoModal from './components/Modal/EditTodoModal';

function App() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(1);
  const [notes, setNotes] = useState([]);
  const [isValidationModalOpen, setisValidationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    getNotes();
  }, [])

  const addTodoInformation = () => {
    //here will be the code to set the note in the local storage so it is available after user leaves browser

    if (name.length > 0 && description.length > 0) {
      setId(id + 1);
      //set local storage key
      let todoNote = {
        id: id,
        name: name,
        description: description,
        isComplete: 0
      }

      localStorage.setItem(`todonote-${todoNote.id}`, JSON.stringify(todoNote));
      getNotes();
    }
    else {
      console.log('ello')
      setisValidationModalOpen(true);
    }

  }

  const toggleValidationModal = () => {
    setisValidationModalOpen(!isValidationModalOpen);
  }

  const getNotes = () => {
    let tempArray = [];
    for (var i = 0; i < localStorage.length; i++) {

      //set iteration key name
      var key = localStorage.key(i);

      //use key name to retrieve the corresponding value

      var value = JSON.parse(localStorage.getItem(key));

      console.log(`Key: ${key} - Value: ${value}`)
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
      case "addtododescription":
        setDescription(value);
        break;
    }

    console.log(value)
  }

  const toggleEditModal = (data) => {
    setIsEditModalOpen(!isEditModalOpen);
    setModalData(data);
  }

  const handleIsComplete = (todoId) => {
    let tempValue = JSON.parse(localStorage.getItem(`todonote-${todoId}`))
    console.log(tempValue);
    tempValue.isComplete = tempValue.isComplete == 0 ? 1 : 0
    localStorage.setItem(`todonote-${todoId}`, JSON.stringify(tempValue));
    getNotes();
  }

  return (
    <div className="App">

      <div style={{ display: 'block', justifyContent: 'center', margin: '0 auto' }} className="addtodo-input-container" >
        <AddtodoName
          input={name}
          handleChange={handleInput}
        />

        <AddtodoDescription
          input={description}
          handleChange={handleInput}
        />

        <AddtodoButton
          btnAction={addTodoInformation}
        />
      </div>

      {notes !== null && notes.length > 0 ?

        <table className="notes-table">
          <thead>
            <tr>
              <th>
                ID
              </th>
              <th>
                Name
              </th>
              <th>
                Desciption
              </th>
              <th>
                Is complete?
              </th>
              <th colSpan={2}>
                Actions
              </th>

            </tr>
          </thead>
          <tbody>

            <Notes
              localStorageNotes={notes}
              handleIsComplete={handleIsComplete}
              toggleEditModal={toggleEditModal}
            />

          </tbody>

        </table>
        : <span>No to-do notes</span>

      }

      {
        isValidationModalOpen ?
          <ValidationModal
            isModalOpen={isValidationModalOpen}
            toggleModal={toggleValidationModal} />
          : null
      }

      {
        isEditModalOpen ?
          <EditTodoModal
            data={modalData}
            isEditModalOpen={isEditModalOpen}
            handleIsComplete={handleIsComplete}
          />
          : null
      }




    </div>
  )
}

export default App

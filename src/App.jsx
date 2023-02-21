import { useEffect, useState } from 'react'
import './App.css'
import AddtodoName from './components/AddtodoName';
import AddtodoDescription from './components/AddtodoDescription';
import AddtodoButton from './components/AddtodoButton';
import Notes from './components/Notes';

function App() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const [notes, setNotes] = useState([])

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
    }

  }

  const getNotes = () => {
    let tempArray = []
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

      <table className="notes-table">
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

        </tr>
        
          {notes !== null && notes.length > 0 ?

            <Notes localStorageNotes={notes} /> : <span>No to-do notes</span>
          }

      </table>




    </div>
  )
}

export default App

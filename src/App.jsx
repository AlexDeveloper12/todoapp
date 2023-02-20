import { useEffect, useState } from 'react'
import './App.css'
import AddtodoName from './components/AddtodoName';
import AddtodoDescription from './components/AddtodoDescription';
import AddtodoButton from './components/AddtodoButton';

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

      var value = localStorage.getItem(key);

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

      <div>
        {notes !== null && notes.length > 0 ?

          <div>hello</div> : <span>goodbye</span>
        }
      </div>




    </div>
  )
}

export default App

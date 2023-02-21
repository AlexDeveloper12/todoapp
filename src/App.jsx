import { useEffect, useState } from 'react'
import './App.css'
import AddtodoName from './components/AddtodoName';
import AddtodoButton from './components/AddtodoButton';
import Note from './components/Note';

function App() {

  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [notes, setNotes] = useState([])

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
    }

    console.log(value)

  }

  return (
    <div className="container">

      <h3 className="text-center">Notes</h3>

      <div className="card card-body my-3">
        <form>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text bg-info text-white">
                <i className="fas fa-book" />
              </div>
            </div>


            <AddtodoName
              input={name}
              handleChange={handleInput}
            />
          </div>

          


          <AddtodoButton
            btnAction={addTodoInformation}
          />

        </form>
      </div>



      {
        notes.length > 0 ?
          <ul className="list-group my-5">
            {
              notes.map(value => {
                return (
                  <Note
                    localNote={value}
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



      </div>









      {/* <table className="table table-striped">
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

          {notes !== null && notes.length > 0 ?

             : <tr><td>No to-do notes</td></tr>
          }
        </tbody>

      </table> */}




    </div>
  )
}

export default App

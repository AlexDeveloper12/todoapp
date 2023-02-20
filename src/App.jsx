import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import AddtodoName from './components/AddtodoName';
import AddtodoDescription from './components/AddtodoDescription';
import AddtodoButton from './components/AddtodoButton';

function App() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

      <AddtodoName
        input={name}
        handleChange={handleInput}
      />

      <AddtodoDescription
        input={description}
        handleChange={handleInput}
      />

      <AddtodoButton/>


    </div>
  )
}

export default App

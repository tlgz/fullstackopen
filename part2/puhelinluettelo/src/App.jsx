import { useState, useEffect } from 'react';
import axios from 'axios'


const Filter=(props)=>{
  
  return(<>filter shown with: <input value={props.input} onChange={props.onchange}/></>)
}

const Form=(props)=>{
  
  return(<>
  <form onSubmit={props.addName}>
        <div>
          <div>
          name: <input value={props.newName} onChange={props.handleOnChange}/>
          </div>
          number: <input value={props.newNumber} onChange={props.handleOnChange2}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  
  
  </>)
}

const Persons=(props)=>{
  
  return(<>{props.persons.map(person =>{
    if (props.newFilter===''){
      return(<div key={person.name}>{person.name} {person.number} </div>)
    }
    if(person.name.toUpperCase().startsWith(props.newFilter.toUpperCase())){
      
      return(<div key={person.name}>{person.name} {person.number} </div>)
  }
  })}</>)
}






const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        
        setPersons(response.data)
        
      })
  }, [])
  

  const addName=(event)=>{
    event.preventDefault()
    
    if (persons.some(name=>name.name===newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (persons.some(name=>name.number===newNumber)){
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    

    const nameObject = {
      name: newName,
      number: newNumber
      
      
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
  const handleOnChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleOnChange2=(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleOnChange3=(event)=>{
    
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }



  return (
    <div>

      <h2>Phonebook</h2>

      <Filter input={newFilter} onchange={handleOnChange3}/>
      
      <Form addName={addName} newName={newName} handleOnChange={handleOnChange} newNumber={newNumber} handleOnChange2={handleOnChange2}/>
      <h2>Numbers</h2>
        
      <Persons persons={persons} newFilter={newFilter}/>
        
          

        
    </div>
  )

}

export default App
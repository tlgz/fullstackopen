import { useState, useEffect } from 'react';
import axios from 'axios'
import personService from './services/persons'


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

const handlebclick=(personId,personName,persons,setPersons)=>
  {
    if (window.confirm(`Do you want to Delete user ${personName}?`)) {
      
      personService
      .deletefrom(personId)
      setPersons(persons.filter(person=>person.id!==personId))
    } 
}

const Persons=(props)=>{
  
  return(<>{props.persons.map(person =>{
    if (props.newFilter===''){
      return(<div key={person.name}>{person.name} {person.number} <button key={person.id} onClick={()=>handlebclick(person.id,person.name, props.persons,props.setPersons)}>Delete</button></div>)
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
    personService
      .getAll('http://localhost:3001/persons')
      .then(response => {
        
        setPersons(response)
        
      })
  }, [])
  

  const addName=(event)=>{
    event.preventDefault()
    
    if (persons.some(name=>name.name===newName)){
      if (persons.some(name=>name.number===newNumber)){
        alert(`${newNumber} is already added to phonebook`)
      }

      if (window.confirm(` ${newName}is already added to phonebook, replace the old number with a new one?`)) {

        const findid=persons.find(n => n.name === newName).id

        const nameObject = {
          name: newName,
          number: newNumber,
          id: `${findid}`  
        }
        
        personService
        .update(findid,nameObject)
        .then(returnedperson =>{setPersons(persons.map(person=>person.id !== findid ?person :returnedperson))})
      }

      setNewName('')
      setNewNumber('')
      
      return
    }
    if (persons.some(name=>name.number===newNumber)){
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    

    const nameObject = {
      name: newName,
      number: newNumber,
      id: `${persons.length+1}`
      
      
    }
    personService
    .create(nameObject)
    .then(response => {
      setPersons(persons.concat(response))
      setNewName('')
    })
    setNewName('')
    setNewNumber('')
  }

  

  const handleOnChange=(event)=>{
    
    setNewName(event.target.value)
  }
  const handleOnChange2=(event)=>{
    
    setNewNumber(event.target.value)
  }
  const handleOnChange3=(event)=>{
    
   
    setNewFilter(event.target.value)
  }



  return (
    <div>

      <h2>Phonebook</h2>

      <Filter input={newFilter} onchange={handleOnChange3}/>
      
      <Form addName={addName} newName={newName} handleOnChange={handleOnChange} newNumber={newNumber} handleOnChange2={handleOnChange2}/>
      <h2>Numbers</h2>
        
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons}/>
        
          

        
    </div>
  )

}

export default App
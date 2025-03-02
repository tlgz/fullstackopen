import { useState } from 'react'


 


const Vote =(props) =>{
  
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Button = (props) => {

  return (
    <button onClick={props.onClick}>
    {props.text}

    </button>
    
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [most, setMost] = useState(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))
  const handleclick =() =>{

    const copy = {...votes} 
    console.log(copy)
    console.log(votes)
    copy[selected]+=1
    const values = Object.values(copy); 
    const maxValue = Math.max(...values); 
    const maxIndices = Object.keys(copy).filter(key => copy[key] === maxValue);
    const randomIndex = maxIndices[Math.floor(Math.random() * maxIndices.length)];

    setVotes(copy)
    setMost(randomIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
      has {votes[selected]} votes
      </div>
      
      <div>
      <Button text="next" onClick={() => {setSelected(Math.floor(Math.random()*7))}}/>
        <Vote text ="vote"  onClick={()=>handleclick()}/>
      </div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[most]}</p>
    </div>
  )
}

export default App
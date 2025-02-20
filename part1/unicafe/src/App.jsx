import { useState } from 'react'

const Display = props => <>{props.value}</>

const All = ({good, bad,neutral}) => <>{good+bad+neutral}</>

const Average = ({good, bad,neutral}) => <>{(good-bad)/(good+bad+neutral)}</>

const Positive = ({good, bad,neutral}) => <>{(good/(good+bad+neutral))*100}%</>

const StatisticLine = (props) =><><th>{props.text}</th><th>{props.value}</th></>

const Statistics= ({good,neutral,bad}) =>
  {
    if (good===0 && neutral===0 && bad===0)
      return(<div>No feedback given</div>)
    return(<table>
      <thead>
      <tr><StatisticLine text="good" value={<Display value={good} name="good" />}/></tr>
      <tr><StatisticLine text="neutral" value={<Display value={neutral} name="neutral" />}/></tr>
      <tr><StatisticLine text="bad" value={<Display value={bad} name="bad"/>}/></tr>
      <tr><StatisticLine text="All" value={<All good={good} neutral={neutral} bad={bad}/>}/></tr>
      <tr><StatisticLine text="Average" value={<Average good={good} neutral={neutral} bad={bad}/>}/></tr>
      <tr><StatisticLine text="Positive" value={<Positive good={good} neutral={neutral} bad={bad}/>}/></tr>
      </thead>
      </table>
    )
}

const Button = (props) =><button onClick={props.onClick}>{props.name}</button>



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => {setGood(good+1)}} name="good"/>
      <Button onClick={() => {setNeutral(neutral+1)}} name="neutral"/>
      <Button onClick={() => {setBad(bad+1)}} name="bad"/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


export default App
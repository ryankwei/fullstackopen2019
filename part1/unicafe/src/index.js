import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>
const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)
const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  if(all===0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <table>
        <Statistic text="good" value={props.good} />
        <Statistic text="neutral" value={props.neutral} />
        <Statistic text="bad" value={props.bad} />
        <Statistic text="all" value={props.bad+props.good+props.neutral} />
        <Statistic text="average" value={(props.good-props.bad)/(props.good+props.neutral+props.bad)} />
        <Statistic text="positive" value={props.good/(props.good+props.neutral+props.bad)} />
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (rating, changeValue) => () => changeValue(rating)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClick(good+1,setGood)} text="good" />
      <Button onClick={handleClick(neutral+1,setNeutral)} text="neutral" />
      <Button onClick={handleClick(bad+1, setBad)} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

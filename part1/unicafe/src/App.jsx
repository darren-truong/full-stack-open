import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / (good + neutral + bad)}</p>
      <p>positive {(100 * good) / (good + neutral + bad) + ' %'}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (type) => {
    switch (type) {
      case 'good':
        return () => setGood(good + 1)
      case 'neutral':
        return () => setNeutral(neutral + 1)
      case 'bad':
        return () => setBad(bad + 1)
    }
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleClick('good')}>good</button>
      <button onClick={handleClick('neutral')}>neutral</button>
      <button onClick={handleClick('bad')}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
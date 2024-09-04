import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    let alreadyAdded = false
    for (let entry of persons) {
      if (entry.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        setNewName('')
        return
      }
    }

    const newPersons = persons.concat({ name: newName })
    setPersons(newPersons)
    setNewName('')
  }

  const handleChange = event => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>name: <input onChange={handleChange} value={newName} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div>{person.name}</div>)}
    </div>
  )
}

export default App
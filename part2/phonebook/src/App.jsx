import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    let alreadyAdded = false
    for (let entry of persons) {
      if (entry.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      }
      if (entry.number === newNumber) {
        window.alert(`${newNumber} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      }
    }


    const newPersons = persons.concat({ name: newName, number: newNumber })
    setPersons(newPersons) 
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>name: <input onChange={handleNameChange} value={newName} /></div>
        <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App
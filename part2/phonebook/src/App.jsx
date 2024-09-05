import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/persons'

const Filter = ({ handleSearchChange, search }) => {
  return <div>filter shown with <input onChange={handleSearchChange} value={search} /></div>
}

const Form = ({ handleSubmit, handleNameChange, newName, handleNumberChange, newNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input onChange={handleNameChange} value={newName} /></div>
      <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({ filteredPersons }) => <>{filteredPersons.map(person => <Person key={person.id} name={person.name} number={person.number} />)}</>

const Person = ({ name, number }) => {
  return <div>{name} {number}</div>
}

const App = () => {
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleSearchChange = event => setSearch(event.target.value)

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

    const newPerson = { name: newName, number: newNumber }
    phonebookService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} search={search} />
      <h3>add a new</h3>
      <Form handleSubmit={handleSubmit} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
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

const Persons = ({ filteredPersons, handleDeletion }) => <>{filteredPersons.map(person => <Person key={person.id} name={person.name} number={person.number} handleDeletion={handleDeletion(person.id, person.name)} />)}</>

const Person = ({ name, number, handleDeletion }) => <div>{name} {number} <button onClick={handleDeletion}>delete</button></div>

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

  const handleSubmit = event => {
    event.preventDefault()

    for (let entry of persons) {
      if (entry.number === newNumber) {
        window.alert(`${newNumber} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      }
      if (entry.name === newName) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const updatedPerson = { ...entry, number: newNumber }
          phonebookService
            .update(entry.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map((person) => person.name === returnedPerson.name ? returnedPerson : person))
              setNewName('')
              setNewNumber('')
            })
          return
        }
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

  const handleDeletion = (id, personName) => {
    return () => {
      if (window.confirm(`Delete ${personName}?`)) {
        phonebookService
          .remove(id)
          .then(deletedPerson => setPersons(persons.filter(person => person.id !== deletedPerson.id)))
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} search={search} />
      <h3>add a new</h3>
      <Form handleSubmit={handleSubmit} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDeletion={handleDeletion} />
    </div>
  )
}

export default App
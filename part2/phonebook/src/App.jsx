import { useState, useEffect } from 'react'
import phonebookService from './services/persons'

import Notification from './components/Notification'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null)

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
      if (entry.name.toLowerCase(0) === newName.toLowerCase()) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const updatedPerson = { ...entry, number: newNumber }
          phonebookService
            .update(entry.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name === returnedPerson.name ? returnedPerson : person))
              setNotification({ message: `Updated ${returnedPerson.name}`, type: 'success' })
              setTimeout(() => setNotification(null), 5000)
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setPersons(persons.filter(person => person.name !== updatedPerson.name))
              setNotification({ message: `Information of ${updatedPerson.name} has already been removed from server`, type: 'failure' })
              setTimeout(() => setNotification(null), 5000)
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
        setNotification({ message: `Added ${returnedPerson.name}`, type: 'success' })
        setTimeout(() => setNotification(null), 5000)
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
      <Notification notification={notification} />
      <Filter handleSearchChange={handleSearchChange} search={search} />
      <h3>add a new</h3>
      <Form handleSubmit={handleSubmit} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDeletion={handleDeletion} />
    </div>
  )
}

export default App
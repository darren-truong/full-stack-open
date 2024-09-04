import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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

    const newPersons = persons.concat({ name: newName, number: newNumber, id: persons.length + 1 })
    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
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
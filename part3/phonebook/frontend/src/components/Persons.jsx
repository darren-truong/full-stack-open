const Persons = ({ filteredPersons, handleDeletion }) => <>{filteredPersons.map(person => <Person key={person.id} name={person.name} number={person.number} handleDeletion={handleDeletion(person.id, person.name)} />)}</>

const Person = ({ name, number, handleDeletion }) => <div>{name} {number} <button onClick={handleDeletion}>delete</button></div>

export default Persons
const Filter = ({ handleSearchChange, search }) => {
  return <div>filter shown with <input onChange={handleSearchChange} value={search} /></div>
}

export default Filter
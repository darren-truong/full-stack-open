import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ handleSearchChange, search }) => {
  return <div>find countries <input onChange={handleSearchChange} value={search} /></div>
}

const Country = ({ country, handleShowChange }) => {
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    if (country.show) {
      const capital = country.capital[0].replace(/ /g, '+')
      const api_key = import.meta.env.VITE_SOME_KEY 
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`).then(response => setWeather(response.data))
    } else {
      setWeather(null)
    }
  }, [country.show])

  if (!country.show) {
    return <div>{country.name.common}<button onClick={handleShowChange(country)}>show</button></div>
  } else {

    if (weather == null) {
      return (
        <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h4>languages:</h4>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
        </ul>
        <img src={country.flags.png} />
      </div>
      )
    } else {
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>
          <h4>languages:</h4>
          <ul>
            {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
          </ul>
          <img src={country.flags.png} />
          <h2>Weather in {country.capital[0]}</h2>
          <p>temperature {weather.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )
    }
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countriesAll, setCountriesAll] = useState([])
  const [countriesMatched, setCountriesMatched] = useState([])

  useEffect(() => {
    const baseUrl = `https://studies.cs.helsinki.fi/restcountries`
    axios
      .get(`${baseUrl}/api/all`)
      .then(response => setCountriesAll(response.data))
  }, [])

  const handleSearchChange = event => {
    const query = event.target.value
    setSearch(query)
    if (query === '') {
      setCountriesMatched([])
      return
    }
    const newCountriesMatched = countriesAll
      .filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
      .map(country => ({ ...country, show: false }))
    setCountriesMatched(newCountriesMatched)
  }

  const handleShowChange = country => {
    return () => {
      const newCountry = { ...country, show: !country.show }
      const newCountriesMatched = countriesMatched
        .map(country => country.name.official !== newCountry.name.official ? country : newCountry)
      setCountriesMatched(newCountriesMatched)
    }
  }

  if (countriesMatched.length > 10) {
    return (
      <div>
        <Search handleSearchChange={handleSearchChange} search={search} />
        <div>Too many matches, specify another filter</div>
      </div>
    )
  } else if (countriesMatched.length >= 2) {
    return (
      <div>
        <Search handleSearchChange={handleSearchChange} search={search} />
        {countriesMatched.map(country => <Country key={country.name.official} country={country} handleShowChange={handleShowChange} />)}
      </div>
    )
  } else if (countriesMatched.length === 1) {
    const country = { ...countriesMatched[0], show: true }
    return (
      <div>
        <Search handleSearchChange={handleSearchChange} search={search} />
        <Country country={country} handleShowChange={handleShowChange} />
      </div>
    )
  } else {
    return (
      <div>
        <Search handleSearchChange={handleSearchChange} search={search} />
      </div>
    )
  }
}

export default App
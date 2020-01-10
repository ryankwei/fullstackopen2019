import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ result, setResult ] = useState(null)
  const [ weather, setWeather ] = useState(null)

  const API_KEY=process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(()=> {
    updateDisplay()
  }, [filter])

  const getWeather = (city) => {
    return axios
      .get(`api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`)
      .then(response => setWeather(response.data))
  }

  const handleShow = (name) => {
    setFilter(name)
  }


  const updateDisplay = () => {
    const smallList = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if(smallList.length < 10 && smallList.length > 1) {
      setResult(smallList.map(country =>
          <div key={country.name}>
            <p>{ country.name }</p>
            <button onClick={() => handleShow(country.name)}>show</button>
          </div>
        ))
    }
    else {
      if(smallList.length === 1) {
        const country = smallList[0]
        getWeather(country.capital)
        setResult(
          <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h2>languages</h2>
            <ul>
              {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="Country's flag'"/>
            {(weather!==null)?
              <div>
                <p>temperature: {weather.main.temp} kelvin</p>
                <p>wind speed: {weather.main.wind.speed} meter/sec {weather.main.wind.deg}</p>
              </div> : 'the weather is not currently available'}
          </div>
        )
      }
      else {
        setResult(null)
        setWeather(null)
      }
    }
  }

  const changeFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries <input value={filter} onChange={changeFilter}/>
      <br />
      { (result===null) ? 'Too many matches, specify another filter' : result }
    </div>
  )
}
export default App;

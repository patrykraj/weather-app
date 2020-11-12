import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

import { API_KEY as key } from './assets/constants'
import { ConvertUnit, ConvertDate } from './assets/conversion'

import Form from './components/Form'

function App() {
  const [searchedQuery, setSearchedQuery] = useState('')
  // const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [coords, setCoords] = useState(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoading(true)

      console.log("Available");
      navigator.geolocation.getCurrentPosition(function(position) {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      }, err => console.log("REJECTED LOCATION ACCESS"))
    } else {
      console.log("Not Available");
    }
  }, [])

  useEffect(() => {
      if (coords) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${key}`)
          .then(res => {
          console.log('RESPONSE', res)
          setData(res.data)
          setLoading(false)
        })
      }
  }, [coords])

  let content;
  if(loading) content = <h1>Loading...</h1>
  else if(!loading && !data) content = <h1>Select location</h1>
  else content = <>
        <h2>{data.name}, {data.sys.country}</h2>
        <h1><span>Current:</span>{ConvertUnit(data.main.temp)}&deg;</h1>
        <div>
          <p>{data.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='weather-icon' />
          <p>
            <span>Max:</span><span>{ConvertUnit(data.main.temp_max)}&deg;</span>
            <span>Min:</span><span>{ConvertUnit(data.main.temp_min)}&deg;</span>
          </p>
          <p>
            <span>Feels like: {ConvertUnit(data.main.feels_like)}&deg;</span>
            <span>Pressure: {data.main.pressure}hPa</span>
            <span>Humidity: {data.main.humidity}%</span>
            <span>Wind: {data.wind.speed}mph</span>
          </p>
          <p>
            <span>
              Sunrise: {ConvertDate(data.sys.sunrise)}:{ConvertDate(data.sys.sunrise, true)}
            </span>
            <span>
              Sunset: {ConvertDate(data.sys.sunset)}:{ConvertDate(data.sys.sunset, true)}  
            </span>
          </p>
        </div>
  </>

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form setData={setData} searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} />
        {content}
      </header>
    </div>
  );
}

export default App;

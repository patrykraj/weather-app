import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios'

import {API_KEY as key} from './assets/constants'
import { ConvertUnit, ConvertDate } from './assets/conversion'

function App() {
  const [data, setData] = useState(null)
  const [coords, setCoords] = useState(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function(position) {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      })
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
        })
      }
  }, [coords])

  if(data === null) return <h1>Loading...</h1>

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{data.name}, {data.sys.country}</h2>
        <h1><span>Current:</span>{ConvertUnit(data.main.temp)}&deg;</h1>
        <div>
          <p>{data.weather[0].description}</p>
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
              Sunset: {ConvertDate(data.sys.sunset)}:{ConvertDate(data.sys.sunset, true)}  
            </span>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;

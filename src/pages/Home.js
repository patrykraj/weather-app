import logo from '../logo.svg';
import { useEffect, useState } from 'react';

import { WEATHER_API_KEY as key } from '../assets/constants'
// import axios from 'axios'
import { connect } from "react-redux";
import * as actions from '../store/actions'

import Form from '../components/Form'
import Loader from '../components/Loader'
import CurrentWeather from '../components/weather/CurrentWeather'

function Home({ coords, onSetCoords, data, onFetchWeatherByCoords, loading, onSetLoading }) {
  const [searchedQuery, setSearchedQuery] = useState('')
  // const [loading, setLoading] = useState(false)
  // const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      // setLoading(true)

      navigator.geolocation.getCurrentPosition(function(position) {
        onSetCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      }, err => {
        setError({
          msg: err.message
        })
      })
    } else {
      console.log("Not Available");
    }
  }, [onSetCoords])

  useEffect(() => {
      if (coords) {
        onFetchWeatherByCoords({coords, key})

        // axios
        //   .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${key}&units=metric`)
        //   .then(res => {
        //     console.log(res.data, 'DATA')
        //     setData(res.data)
        //     setLoading(false)
        //   })
        //   .catch(err => 
        //     setError({ 
        //         msg: err.response ? err.response.data.message : err.message, 
        //         query: null
        //     })
        //   )
      }
  }, [coords, onFetchWeatherByCoords])

  let content;
  if(loading) content = <Loader />
  else if(!loading && !data) content = <h1>Select location</h1>
  else content = <CurrentWeather data={data} />

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error ? error.msg : null}
        <Form searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} setError={setError} />
        {content}
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    coords: state.coords,
    data: state.weatherData,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetCoords: (payload) => dispatch(actions.setCoords(payload)),
    onFetchWeatherByCoords: (payload) => dispatch(actions.fetchWeatherByCoords(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
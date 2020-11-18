import logo from '../logo.svg';
import { useEffect, useState } from 'react';

import { WEATHER_API_KEY as key } from '../assets/constants'
import { connect } from "react-redux";
import * as actions from '../store/actions'

import Form from '../components/Form'
import Loader from '../components/Loader'
import CurrentWeather from '../components/weather/CurrentWeather'

function Home({ onFetchWeatherStart, coords, data, onFetchWeatherByCoords, loading, error, onSetError }) {
  const [searchedQuery, setSearchedQuery] = useState('')

  useEffect(() => {
    if ("geolocation" in navigator && !coords) {
      onFetchWeatherStart()

      navigator.geolocation.getCurrentPosition(function(position) {
        onFetchWeatherByCoords({
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          },
          key
        })
      }, err => {
        onSetError({
          msg: err.message
        })
      })
    } else {
      console.log("Not Available");
    }
  }, [onFetchWeatherStart, onSetError, coords, onFetchWeatherByCoords])

  let content;
  if(loading) content = <Loader />
  else if(!loading && !data) content = <h1>Select location</h1>
  else content = <CurrentWeather data={data} />

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error ? error.msg : null}
        <Form searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} />
        {content}
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    coords: state.coords,
    data: state.weatherData,
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchWeatherStart: () => dispatch(actions.fetchWeatherStart()),
    onFetchWeatherByCoords: (payload) => dispatch(actions.fetchWeatherByCoords(payload)),
    onSetError: (payload) => dispatch(actions.setError(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
import logo from '../logo.svg';
import { useEffect, useState } from 'react';

import { WEATHER_API_KEY as key } from '../assets/constants'
import { connect } from "react-redux";
import * as actions from '../store/actions'

import Form from '../components/Form'
import Loader from '../components/Loader'
import CurrentWeather from '../components/weather/CurrentWeather'

function Home({ onFetchWeatherStart, coords, onSetCoords, data, onSetData, onFetchWeatherByCoords, loading, onSetLoading }) {
  const [searchedQuery, setSearchedQuery] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      onFetchWeatherStart()

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
  }, [onSetCoords, onFetchWeatherStart])

  useEffect(() => {
      if (coords) {
        onFetchWeatherByCoords({coords, key})
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
        <Form searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} setError={setError} setLoading={onSetLoading} setData={onSetData} />
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
    onSetLoading: (payload) => dispatch(actions.setLoading(payload)),
    onSetData: (payload) => dispatch(actions.setData(payload)),
    onFetchWeatherStart: () => dispatch(actions.fetchWeatherStart()),
    onSetCoords: (payload) => dispatch(actions.setCoords(payload)),
    onFetchWeatherByCoords: (payload) => dispatch(actions.fetchWeatherByCoords(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);